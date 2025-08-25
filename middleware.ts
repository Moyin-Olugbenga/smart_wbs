import { Auth } from "@/classes/Auth";
import { NextResponse } from "next/server";
import { RNextRequest } from "./types";

export const middleware = async(req: RNextRequest) => {



    // authenticate users for specific routes
    if(req.nextUrl.pathname.startsWith("/app")){
        try{
            const token = req.cookies.get("noisses")?.value;
            await Auth.verifyToken(req, token);
        }catch(error){
            return NextResponse.redirect("/auth/login");
        }
    }

    return NextResponse.next();
}

