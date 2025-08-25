// utils/qrGenerator.ts
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

export class QRGenerator {
    static async generateAndSaveQR(url: string, filename?: string): Promise<string> {
        try {
            // Create the public/qrcodes directory if it doesn't exist
            const qrDir = path.join(process.cwd(), 'public', 'qrcodes');
            console.log("QR directory: ", qrDir);
            if (!fs.existsSync(qrDir)) {
                fs.mkdirSync(qrDir, { recursive: true });
            }

            // Generate filename if not provided
            const qrFilename = filename || `qr_${Date.now()}.png` as string;
            const filePath = path.join(qrDir, qrFilename);

            // Generate QR code and save as PNG
            await QRCode.toFile(filePath, url, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });

            // Return the public URL path
            return qrFilename
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw new Error('Failed to generate QR code');
        }
    }

    static async generateQRBuffer(url: string): Promise<Buffer> {
        try {
            const buffer = await QRCode.toBuffer(url, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            return buffer;
        } catch (error) {
            console.error('Error generating QR code buffer:', error);
            throw new Error('Failed to generate QR code');
        }
    }

    static async generateQRDataURL(url: string): Promise<string> {
        try {
            const dataURL = await QRCode.toDataURL(url, {
                width: 300,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            return dataURL;
        } catch (error) {
            console.error('Error generating QR code data URL:', error);
            throw new Error('Failed to generate QR code');
        }
    }
}