'use server';

import {prisma} from '@/globals/db';
import {auth} from '@/auth';
import {getUserByEmail} from "@/app/db/user";
import {formatFileSize} from "@/app/lib/formatFileSize";

export const uploadFile = async (formData: FormData) => {
    try {
        // ファイル情報を取得
        const file = formData.get('file') as File;
        const name = file?.name;
        const size = file?.size;
        const ArrayBuffer = await file?.arrayBuffer();
        if (!name || !size || !ArrayBuffer) {
            throw new Error('ファイルが指定されていません');
        }

        const buffer = Buffer.from(ArrayBuffer);

        // セッション情報を取得
        const session = await auth();
        const email = session?.user?.email ?? "";
        if (!email) {
            throw new Error('不正なセッション情報です');
        }

        const user = await getUserByEmail(email);
        const userId = user?.id;
        if (!userId) {
            throw new Error('ユーザーIDが指定されていません');
        }

        // Prismaを使ってデータベースにファイルを保存
        const newFile = await prisma.file.create({
            data: {
                originalName: name ?? 'unknown',
                fileData: buffer,
                size: size,
                userId: userId,
            },
        });

        const res = {
            id: newFile.id,
            name: newFile.originalName,
            size: formatFileSize(newFile.size),
            modified: newFile.createdAt.toLocaleString('ja-JP'),
        }

        return {success: true, file: res};
    } catch (error) {
        if (error instanceof Error) {
            console.error('ファイルアップロード中にエラーが発生しました', error);
        }
        return {success: false, error: 'ファイルアップロード中にエラーが発生しました'};
    }
};
