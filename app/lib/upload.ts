'use server';

import { prisma } from '@/globals/db';
import { auth } from '@/auth';
import {getUserByEmail} from "@/app/db/user";

export const uploadFile = async (req: Request) => {
    try {
        // FormDataを使用してリクエストからファイルを取得
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            throw new Error('ファイルがアップロードされていません');
        }

        // ファイルデータをバッファとして読み込む
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const size = file.size;

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
                originalName: file.name ?? 'unknown',
                fileData: buffer,
                size: size,
                userId: userId,
            },
        });

        return { success: true, file: newFile };
    } catch (error) {
        if (error instanceof Error) {
            console.error('ファイルアップロード中にエラーが発生しました', error);
        }
        return { success: false, error: 'ファイルアップロード中にエラーが発生しました' };
    }
};
