"use server";

import { db } from "@/db";
import { clinicsTable, usersToClinicsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const createClinic = async (name: string) => {
    //verificar se o usuario está logado
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user){
        throw new Error("Usuário não está logado")
    }
    const [clinic] = await db.insert(clinicsTable).values({name}).returning();
    await db.insert(usersToClinicsTable).values({
        userId: session.user.id,
        clinicId: clinic.id
    });
    redirect("/dashboard")
}