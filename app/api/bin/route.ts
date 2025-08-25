
import { database } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {
    try{

            const bin = await database.bin.findMany({
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                    location: true,
                    binUrl: true,
                    filename: true,
                    _count: {
                        select: {
                            notification: {
                            where: { status: "UNVIEWED" }
                            }
                        }
                    },
                    document: {
                        orderBy: { createdAt: "desc" },
                        take: 1,
                        select: {
                            uuid: true,
                            filled_state: true,
                            createdAt: true,
                        }
                    }
                }

            });
            if(!bin) {
                throw new Error("Could not fetch bins")
            }
        return NextResponse.json({ message: "Bins fetched Successfully.", data: bin }, { status: 200 })

            
        }catch(error){
            console.error(error);
            throw new Error("An error occurred while fetching bin.");
        }
    }