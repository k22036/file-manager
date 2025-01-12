'use client';

import Link from 'next/link';
import {useState, useEffect, ChangeEvent} from 'react';
import {fetchFiles} from "@/app/lib/fetchFiles";
import {downloadFile} from "@/app/lib/download";
import {uploadFile} from "@/app/lib/upload";
import {formatFileSize} from "@/app/lib/formatFileSize";

interface File {
    id: number;
    name: string;
    size: string;
    modified: string;
}

export default function MyPage() {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        let isMounted = true; // マウント状態を管理するフラグ

        fetchFiles().then((result) => {
            if (isMounted && result.success) {
                result.files?.forEach((file) => {
                    const newFile = {
                        id: file.id,
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

    const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            try {
                const formData = new FormData();
                formData.append('file', uploadedFile);

                const res = await uploadFile(formData);
                if (!res.success) {
                    throw new Error('ファイルアップロード中にエラーが発生しました');
                }

                const newFile = res.file;
                if (!newFile) {
                    throw new Error('ファイルアップロード中にエラーが発生しました');
                }

                setFiles([...files, newFile]);
            } catch (error) {
                console.error('ファイルアップロード中にエラーが発生しました', error);
            }
        }
    };

    const handleDownload = async (fileId: number) => {
        try {
            const res = await downloadFile(fileId);
            if (!res.success) {
                throw new Error('ファイルダウンロード中にエラーが発生しました');
            }
            if (!res.file) {
                throw new Error('ファイルが見つかりません');
            }

            const buffer = Buffer.from(res.file.fileData);
            const blob = new Blob([buffer], {type: 'application/octet-stream'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = res.file.originalName;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('ファイルダウンロード中にエラーが発生しました', error);
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
                                <button
                                    onClick={() => handleDownload(file.id)}
                                    className='text-blue-500 hover:underline'
                                >
                                    ダウンロード
                                </button>
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
