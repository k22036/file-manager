'use client';

import Link from 'next/link';
import { useState, useEffect, ChangeEvent } from 'react';

interface File {
    name: string;
    size: string;
    modified: string;
}

export default function MyPage() {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        // Fetch files (simulate fetching file list from a server or storage)
        const fetchedFiles: File[] = [
            { name: 'document1.txt', size: '15 KB', modified: '2025-01-08' },
            { name: 'presentation.pptx', size: '2 MB', modified: '2025-01-07' },
            { name: 'image.jpg', size: '500 KB', modified: '2025-01-06' },
        ];
        setFiles(fetchedFiles);
    }, []);

    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            const newFile: File = {
                name: uploadedFile.name,
                size: `${(uploadedFile.size / 1000).toFixed(2)} KB`,
                modified: new Date().toISOString().split('T')[0],
            };
            setFiles((prevFiles) => [...prevFiles, newFile]);
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
                    <input type='file' onChange={handleUpload} className='mb-4' />
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
