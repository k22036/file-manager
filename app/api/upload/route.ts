import {NextResponse} from "next/server";
import {uploadFile} from '@/app/lib/upload';

export async function POST(request: Request) {
    try {
        const result = await uploadFile(request);
        if (result.error) {
            return NextResponse.json({error: result.error}, {status: 400});
        }
        return NextResponse.json({result}, {status: 200});
    } catch (error) {
        console.error('ファイルアップロード中にエラーが発生しました:', error);
        return NextResponse.json({error: 'ファイルアップロード中にエラーが発生しました'}, {status: 500});
    }
}
