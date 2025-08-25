import { database } from "@/config/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { Session } from "@/classes/Session";

export const POST = async(req: NextRequest) => {
    try{
        const { username, password } = await req.json();

        // Check if user exists in the database
        const user = await database.token.findFirst({
            where: {
                username: username
            }
        });

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 404});
        }
        
        const password_verify = await bcrypt.compare(password, user?.password);

        if(!password_verify){
            return NextResponse.json({error: "Incorrect password"}, {status: 401});
        }

        await Session.createSession(user.uuid);

        return NextResponse.json(
            {
                message: "User logged in successfully",
            },
            {status: 200}
        )

    }catch(error){
        console.error(error);
        return NextResponse.json({error: "An error occurred while logging in the user."}, {status: 500});
    }
}