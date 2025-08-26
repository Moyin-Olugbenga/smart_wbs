
import { database } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req: NextRequest, context: { params: Promise<{ binId: string }> }
) => {
    const {binId} = await context.params;
    const {location, filled_state, note} = await req.json();
    try{

            const bin = await database.bin.findUnique({
                where: {
                    uuid: binId,
                }
            });
            if(!bin) {
                throw new Error("Unknown bin");
            }
            const updateBin = await database.bin.update({
                where: {
                    uuid: binId
                },
                data: {
                    location,
                    notification: {
                        create: [{
                            note,
                        }]
                    },
                    document: {
                        create: [{
                            filled_state: parseInt(filled_state)
                        }]
                    }
                }
            })
        return NextResponse.json({ message: "Bins fetched Successfully.", data: updateBin }, { status: 200 })

            
        }catch(error){
            console.error(error);
            throw new Error("An error occurred while fetching bin.");
        }
    }

