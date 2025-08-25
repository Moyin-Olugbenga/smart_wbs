"use server";
import { database } from "@/config/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "@/classes/Session";

export const POST = async(req: NextRequest) => {
    try{
        
        const { username, password } = await req.json();
            
            const user = await database.token.findUnique({
                where: {
                    username: username
                }
            });

            const passwordCheck = await bcrypt.compare(password, user?.password as string);
            const userId = user?.uuid as string;
        
            if(!passwordCheck){
                return NextResponse.json({error: "Incorrect password"}, {status: 401});
            }

            await Session.createSession(userId);
            
            return NextResponse.json(
                {
                    message: "User logged in successfully",
                },
                {status: 200}
            )

        }catch(error){
            console.error(error);
            return NextResponse.json({error: "An error occurred while logging in the user."}, {status: 500});
        }
    }