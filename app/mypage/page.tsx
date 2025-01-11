'use client';

import Link from 'next/link';
import {useState, useEffect, ChangeEvent} from 'react';
import {DateTime} from 'luxon';
import {fetchFiles} from "@/app/lib/fetchFiles";

interface File {
    name: string;
    size: string;
    modified: string;
}

interface FileUploadResponse {
    result: {
        file: {
            originalName: string;
            fileData: Buffer;
            createdAt: string;
        };
    }
}

export default function MyPage() {
    const [files, setFiles] = useState<File[]>([]);

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        const kilobytes = bytes / 1024;
        if (kilobytes < 1024) return `${kilobytes.toFixed(2)} KB`;
        const megabytes = kilobytes / 1024;
        if (megabytes < 1024) return `${megabytes.toFixed(2)} MB`;
        const gigabytes = megabytes / 1024;
        return `${gigabytes.toFixed(2)} GB`;
    };

    useEffect(() => {
        let isMounted = true; // マウント状態を管理するフラグ

        fetchFiles().then((result) => {
            if (isMounted && result.success) {
                result.files?.forEach((file) => {
                    const newFile = {
                        name: file.originalName,
                        size: formatFileSize(file.size),
                        modified: file.createdAt.toLocaleString('ja-JP'),
                    };
                    setFiles((files) => [...files, newFile]);
                });
            }
        });
        return () => {
            isMounted = false; // アンマウント時にフラグをオフ
        };
    }, []);

    const convertToJST = (dateString: string): string => {
        const utcDate = DateTime.fromISO(dateString, { zone: 'utc' });
        const jstDate = utcDate.setZone('Asia/Tokyo');
        return jstDate.toFormat('yyyy/M/d HH:mm:ss');
    };

    const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            // APIにファイルをアップロード
            try {
                const formData = new FormData();
                formData.append('file', uploadedFile);

                // ファイルをアップロードするAPIエンドポイントを呼び出し
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (!res.ok) {
                    throw new Error('ファイルアップロード中にエラーが発生しました');
                }

                const result: FileUploadResponse = await res.json();
                const newFile = {
                    name: result.result.file.originalName,
                    size: formatFileSize(uploadedFile.size),
                    modified: convertToJST(result.result.file.createdAt),
                }
                setFiles([...files, newFile]);
                console.log(result);
            } catch (error) {
                console.error('ファイルアップロード中にエラーが発生しました', error);
            }
        }
    };

    return (
        <main className='flex min-h-screen flex-col items-center'>
            <h1 className='my-6 text-center text-2xl'>マイページ</h1>
            <div className='flex flex-col w-full max-w-2xl'>
                <div className='bg-gray-200 rounded-tl-md rounded-tr-md px-2 py-1.5 text-sm'>
                    ファイル管理
                </div>
                <div className='bg-gray-100 rounded-bl-md rounded-br-md p-2'>
                    <input type='file' onChange={handleUpload} className='mb-4'/>
                    <ul className='space-y-2'>
                        {files.map((file, index) => (
                            <li key={index} className='flex justify-between bg-white p-2 rounded-md shadow-sm'>
                                <span>{file.name}</span>
                                <span className='text-sm text-gray-500'>{file.size} - {file.modified}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Link
                href='/'
                className='bg-green-500 text-white rounded-lg px-8 py-2 mt-6 hover:bg-green-400 focus-visible:outline-offset-2'
            >
                ホーム
            </Link>
        </main>
    );
}
