'use server';

import { auth } from '@/auth';
import { getUserByEmail } from "@/app/db/user";
import { getFileById } from "@/app/db/file";

export const downloadFile = async (fileId: number) => {
    try {
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

        const file = await getFileById(fileId, userId);
        if (!file) {
            throw new Error('ファイルが見つかりません');
        }
        const res = {
            id: file.id,
            originalName: file.originalName,
            size: file.size,
            createdAt: file.createdAt,
            fileData: file.fileData,
        }

        return { success: true, file: res };
    } catch (error) {
        if (error instanceof Error) {
            console.error('ファイル情報取得中にエラーが発生しました', error);
        }
        return { success: false, error: 'ファイル情報取得中にエラーが発生しました' };
    }
};
