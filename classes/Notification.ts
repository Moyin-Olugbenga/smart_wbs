// import QRCode from "qrcode";
import {Notification as Notifications} from "@prisma/client";
import axios from "axios";

    const llink = process.env.NEXT_PUBLIC_API_LINK;

export class Notification {
    public static async getNotifications() : Promise<Notifications[]> {
        try {
            
            const {data} =  await axios.get(`${llink}/api/notification`); 
             
             return data?.data;
            
        } catch(err) {
           console.error(err);
            // return NextResponse.json({error: "An error occurred while fetching the tokens."}, {status: 500});
            throw new Error("Error occured while fetching the list of bins");
        }
    }

    public static async viewedNotification(uuid:string) : Promise<any> {
        try {
            const {data} =  await axios.put(`${llink}/api/notification/update`, {uuid});
                
                return data?.data;

        } catch(err) {
           console.error(err);
            // return NextResponse.json({error: "An error occurred while fetching the tokens."}, {status: 500});
            throw new Error("Error occured while updating notification");
        }
    }

    
    public static async deletedNotification(uuid:string) : Promise<any> {
        try {
            
            const {data} =  await axios.put(`${llink}/api/notification/delete`, {uuid}); 
             return data?.data;

        } catch(err) {
           console.error(err);
            // return NextResponse.json({error: "An error occurred while fetching the tokens."}, {status: 500});
            throw new Error("Error occured while deleting notification");
        }
    }

    
}