import {prisma} from '@/globals/db';

export const getFileById = async (fileId: number, userId: string) => {
    try {
        return await prisma.file.findFirst({
            where: {
                id: fileId,
                userId: userId,
            },

        });
    } catch (error) {
        return null;
    }
};
