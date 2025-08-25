
import { database } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {
    try{
        const tokens = await database.token.findMany({
            select: {
                id: true,
                username: true,
                pass: true,
            }
        });

        
        // return tokens;
        
        return NextResponse.json({ message: "Tokens gotten Successfully.", data: tokens }, { status: 200 })

        }catch(error){
            console.error(error);
            throw new Error("An error occurred while fetching notifications.");
        }
    }