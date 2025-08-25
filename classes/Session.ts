import "server-only";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export class Session {
    public static async createSession(userId: string) {
        const token = jwt.sign(
            { userId},
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        )

        const cookiesStore = await cookies();

        cookiesStore.set("noisses", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sameSite: 'lax',
            path: '/',
        });

    }
    
    public static async createBinSession(binId: string) {
        const token = jwt.sign(
            { binId},
            process.env.JWT_SECRET as string,
            { expiresIn: "12h" }
        )

        const cookiesStore = await cookies();

        cookiesStore.set(binId, token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() +  12 * 60 * 60 * 1000),
            sameSite: 'lax',
            path: '/',
        });

    }
    public static async getBinSession(binId: string) {
        

        const cookiesStore = await cookies();

        const token = cookiesStore.get(binId);
         if (token) {
        const tokenValue = token.value;
        const payload = jwt.verify(tokenValue, process.env.JWT_SECRET as string) as JwtPayload;
        return binId == payload.binId;
    }


    }

    public static async updateSession(token: string) {
        const cookiesStore = await cookies();
            
        cookiesStore.set("noisses", token, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
            sameSite: 'lax',
        })
    }

    public static async destroySession() {
        const cookiesStore = await cookies();
            
        cookiesStore.delete("noisses");
    }
}