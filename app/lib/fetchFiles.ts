'use server';

import {prisma} from '@/globals/db';
import {auth} from '@/auth';
import {getUserByEmail} from "@/app/db/user";

export const fetchFiles = async () => {
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

        // Prismaを使ってデータベースからファイルを取得
        const files = await prisma.file.findMany({
            where: {
                userId: userId,
            },
        });
        const res = files.map((file) => {
            return {
                id: file.id,
                originalName: file.originalName,
                size: file.size,
                createdAt: file.createdAt,
            };
        });

        return {success: true, files: res};
    } catch (error) {
        if (error instanceof Error) {
            console.error('ファイル情報取得中にエラーが発生しました', error);
        }
        return {success: false, error: 'ファイル情報取得中にエラーが発生しました'};
    }
};
