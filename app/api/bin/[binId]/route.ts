
import { database } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest, context: { params: Promise<{ binId: string }> }
) => {
    const {binId} = await context.params;
    try{

            const bin = await database.bin.findUnique({
                where: {
                    uuid: binId,
                }
            });
            
            if(!bin) {
                throw new Error("Could not fetch Bin")
            }
        return NextResponse.json({ message: "Bins fetched Successfully.", data: bin }, { status: 200 })

            
        }catch(error){
            console.error(error);
            throw new Error("An error occurred while fetching bin.");
        }
    }

