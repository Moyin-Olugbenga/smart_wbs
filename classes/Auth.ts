import "server-only";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "./Session";  
import axios from 'axios';
import { RNextRequest } from "@/types";
import { redirect } from "next/navigation";

    const llink = process.env.NEXT_PUBLIC_API_LINK;

export class Auth {
    public static async login(info: {username: string, password:string}) : Promise<any> {
        try{
            const username = info.username;
            const password = info.password;
            const { data } = await axios.post(`${llink}/api/auth/login`, {
                username, password
            }); 
            // redirect(`${llink}/app/`);
        }catch(error){

        }
    }

    
    public static async invalidAuth() {
        return NextResponse.json({ error: "Invalid authentication" }, { status: 401 });

    } 

      public static async verifyToken(req: RNextRequest, tok?: string): Promise<any> {
        try {
            let token = "";
            if(!tok){
                const authHeader = req?.headers && req.headers.get("Authorization");
                if(!authHeader) {
                    return this.invalidAuth();
                }
                const [bearer, token] = authHeader.split(" ");
                if (!bearer || !token) {
                    return this.invalidAuth();
                }
            }else{
                token = tok;
            }
            
            const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

            const { data } = await axios.get(`/api/user/${payload.userId}`);
            req.user = data.user;
            
            NextResponse.next();
        } catch (error) {
            if(error instanceof TokenExpiredError) {
                await this.refreshToken(req);
                NextResponse.next();
            }
            console.error("Error authenticating user:", error);
            throw error;
        }
    }

    
    public static async refreshToken(req: RNextRequest) {
        try{
            const refreshToken = req.cookies.get("noisses_hserfer")?.value;
            if (!refreshToken) {
                throw new Error("Refresh token not found.");
            }

            const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload;
            const newToken = jwt.sign(
                { userId: payload?.userId, fellowshipId: payload.fellowshipId },
                process.env.JWT_SECRET as string,
                { expiresIn: "7d" }
            )

            Session.updateSession(newToken);
        }catch(error){
            console.error("Error refreshing token:", error);
        }
    }

}