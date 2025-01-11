import {prisma} from '@/globals/db';

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({where: {email}});
    } catch (error) {
        return null;
    }
};
