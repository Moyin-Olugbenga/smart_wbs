"use server";
import { Auth } from "@/classes/Auth";
import { redirect } from "next/navigation";

export async function loginAction(formData: { username: string; password: string }) {
    try {
        await Auth.login(formData);
    } catch (error) {
        console.log({ error });
        throw error; // Re-throw to handle in client
    }
    
        redirect("/app/bin");
}