
import { database } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest) => {
    try{
        const {bin} = await req.json();

            const bins = await database.bin.create({
                data:{
                name: bin
                }
            });
        return NextResponse.json({ message: "Bin created Successfully.", data: bins }, { status: 200 })


        }catch(error){
            console.error(error);
            throw new Error("An error occurred while creating bin.");
        }
    };

