
import { NextResponse } from "next/server";
// import QRCode from "qrcode";
import axios from "axios";
import {Bin as _Bin} from "@prisma/client"
import { Prisma } from "@prisma/client";
    const llink = process.env.NEXT_PUBLIC_API_LINK;

export type BinResult = Prisma.BinGetPayload<{
  select: {
    id: true;
    uuid: true;
    name: true;
    location: true;
    binUrl: true;
    filename: true;
    _count: {
      select: {
        notification: {
          where: { status: "UNVIEWED" }
        };
      };
    };
    document: {
      orderBy: { createdAt: "desc" };
      take: 1;
      select: {
        uuid: true;
        filled_state: true;
        createdAt: true;
      };
    };
  };
}>;

export type TokenResult = Prisma.TokenGetPayload<{
    select: {
        id: true,
        username: true,
        pass: true,
    }
}>


export class Bin {
    public static async getBinById(binId: string) : Promise<_Bin> {
        try {
            const {data} =  await axios.get(`${llink}/api/bin/${binId}`); 
             return data?.data;
        } catch(err) {
           console.error(err);
            // return NextResponse.json({error: "An error occurred while fetching the tokens."}, {status: 500});
            throw new Error("Error occured while fetching the list of bins");
        }
    }
    public static async getBins() : Promise<any> {
        try {
            const {data} =  await axios.get(`${llink}/api/bin`); 
             return data?.data;
        } catch(err) {
           console.error(err);
            // return NextResponse.json({error: "An error occurred while fetching the tokens."}, {status: 500});
            throw new Error("Error occured while fetching the list of bins");
        }
    }
    
    public static async reportBin(binId: string) : Promise<_Bin> {
        try {
            const {data} =  await axios.post(`${llink}/api/bin/${binId}/report`); 
             return data?.data;
        } catch(err) {
           console.error(err);
            // return NextResponse.json({error: "An error occurred while fetching the tokens."}, {status: 500});
            throw new Error("Error occured while fetching the list of bins");
        }
    }

    public static async createBin() {
        try {
            const random = await this.generateToken(4);
            const bin = "bin" + random;
            
            const {data} =  await axios.post(`${llink}/api/bin/create`, {
                bin
             });
             
             return data?.data;


        } catch(err) {
           console.error(err);
            return NextResponse.json({error: "An error occurred while generating bin."}, {status: 500});
 
        }
    }
    private static async generateToken(n: number) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for(var i = 0; i < n; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }
        
    
}