
import { database } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req: NextRequest) => {
    try{
        const {uuid} = await req.json();
        const notification = await database.notification.update({
            where:{
                uuid,
            },
            data: {
                status: "DELETED"
            }
        });
        return NextResponse.json({ message: "Notification deleted Successfully.", data: notification }, { status: 200 })


        }catch(error){
            console.error(error);
            throw new Error("Error occured while deleting notification");
        }
    }