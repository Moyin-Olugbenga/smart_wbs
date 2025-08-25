
import { NextResponse } from "next/server";
// import QRCode from "qrcode";
import axios from "axios";
    const llink = process.env.NEXT_PUBLIC_API_LINK;

export class Bin {
    public static async updateBinLocation(binId: string, updates: any) : Promise<any> {
        try {

            const {data} =  await axios.post(`${llink}/api/webhook/${binId}/location`, {
                location: updates.location
            }); 
             return data?.data;
        } catch(err) {
           console.error(err);
            // return NextResponse.json({error: "An error occurred while fetching the tokens."}, {status: 500});
            throw new Error("Error occured while updating bin parameter");
        }
    }   

    
    public static async updateBinParams(binId: string, updates: any) : Promise<any> {
        try {

            const {data} =  await axios.post(`${llink}/api/webhook/${binId}/updates`, {
                location: updates.location,
                filled_state: updates.filled_state,
                note: updates.note
            }); 
             return data?.data;
        } catch(err) {
           console.error(err);
            // return NextResponse.json({error: "An error occurred while fetching the tokens."}, {status: 500});
            throw new Error("Error occured while updating bin parameter");
        }
    }   
}