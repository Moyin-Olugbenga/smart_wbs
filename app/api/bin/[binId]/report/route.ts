
import { Session } from "@/classes/Session";
import { database } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest, context: { params: Promise<{ binId: string }> }
) => {
    const {binId} = await context.params;
    try{
        const checkSession = await Session.getBinSession(binId);
        if(checkSession !== true) {
            
            const bin = await database.documentation.create({
                data: {
                    filled_state: 100,
                    bin: {
                        connect: {
                            uuid: binId
                        }
                    },
                }
            });
            await Session.createBinSession(binId);
            return NextResponse.json({ message: "Bin Reported Successfully. Thank you for taking time to care about the environment", data: bin }, { status: 200 })
        }
         return NextResponse.json({ message: "Sorry, you can't report the same bin more than once in 12 hours", data: {} }, { status: 200 })


            
        }catch(error){
            console.error(error);
            throw new Error("An error occurred while reporting bin.");
        }
    }