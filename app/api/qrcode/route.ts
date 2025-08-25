// app/api/generate-qr/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { QRGenerator } from "@/classes/QrCode";
import { database } from '@/config/db';
// import { Token } from "@/classes/Token";

    const llink = process.env.NEXT_PUBLIC_API_LINK as string;
export async function POST(req: NextRequest) {
    try {
        const {uuid, saveFile } = await req.json();

        // if (!url) {
        //     return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        // }
        const url = `${llink}/${uuid}`;
        const fileRealName = uuid.concat(".png");

        if (saveFile == true) {
            // Save QR code as file and return file path
            const filePath = await QRGenerator.generateAndSaveQR(url, fileRealName);
            // const file = filePath;
            const updateBin = await database.bin.update({
                where: {
                    uuid
                },
                data: {
                    filename:filePath,
                    binUrl:url
                }
            });
            return NextResponse.json({ 
                success: true, 
                filePath,
                message: 'QR code generated and saved successfully' 
            });
        } else {
            // Return QR code as data URL (base64)
            const dataURL = await QRGenerator.generateQRDataURL(url);
            if(!dataURL){
                throw new Error("SOmething went wrong");
            }
             await database.bin.update({
                where: {
                    uuid
                },
                data: {
                    binUrl: url
                }
            });
            return NextResponse.json({ 
                success: true, 
                dataURL,
                message: 'QR code generated successfully' 
            });
        }
    } catch (error) {
        console.error('Error in QR generation API:', error);
        return NextResponse.json({ 
            error: 'Failed to generate QR code' 
        }, { status: 500 });
    }
}

// export async function GET(req: NextRequest) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const url = searchParams.get('url');

//         if (!url) {
//             return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
//         }

//         // Generate QR code as PNG buffer
//         const buffer = await QRGenerator.generateQRBuffer(url);

//         return new NextResponse(buffer, {
//             headers: {
//                 'Content-Type': 'image/png',
//                 'Content-Disposition': 'inline; filename="qrcode.png"'
//             }
//         });
//     } catch (error) {
//         console.error('Error generating QR code:', error);
//         return NextResponse.json({ 
//             error: 'Failed to generate QR code' 
//         }, { status: 500 });
//     }
// }