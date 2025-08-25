
import { database } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {
    try{
        const notification = await database.notification.findMany({
                orderBy: {
                    createdAt: "desc"
                }
            });
            
            if(!notification) {
                throw new Error("Could not fetch Notification")
            }
        return NextResponse.json({ message: "Notification gotten Successfully.", data: notification }, { status: 200 })


        }catch(error){
            console.error(error);
            throw new Error("An error occurred while fetching notifications.");
        }
    }