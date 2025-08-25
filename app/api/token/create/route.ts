
import { database } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try{
        const {token, random_password, hash} = await req.json();

        const tokens = await database.token.create({
            data:{
                username: token,
                pass: random_password,
                password: hash
            }
        });
        const {password, ...safeTokens} = tokens;
        
        return NextResponse.json({ message: "Tokens created Successfully.", data: safeTokens }, { status: 200 })

        }catch(error){
            console.error(error);
            throw new Error("An error occurred while creating bin.");
        }
    }
