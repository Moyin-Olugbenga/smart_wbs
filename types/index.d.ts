
import { Token } from "@prisma/client";
import { NextRequest } from "next/server";


export interface RNextRequest extends NextRequest {
    user: Token | null;
}