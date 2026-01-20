"use server"

import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"

import { db } from "@/db"
import { doctorsTable } from "@/db/schema"
import { auth } from "@/lib/auth"
import { actionClient } from "@/lib/next-safe-actions"

import { upsertDoctorSchema } from "./schema"

dayjs.extend(utc)

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    // -----------------------------
    // Horários
    // -----------------------------
    const [fromHour, fromMinute, fromSecond] =
      parsedInput.availableFromTime.split(":").map(Number)

    const [toHour, toMinute, toSecond] =
      parsedInput.availableToTime.split(":").map(Number)

    const availableFromTimeUTC = dayjs()
      .set("hour", fromHour)
      .set("minute", fromMinute)
      .set("second", fromSecond)
      .utc()

    const availableToTimeUTC = dayjs()
      .set("hour", toHour)
      .set("minute", toMinute)
      .set("second", toSecond)
      .utc()

    // -----------------------------
    // Auth
    // -----------------------------
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      throw new Error("Unauthorized")
    }

    if (!session.user.clinic?.id) {
      throw new Error("Clinic not found")
    }

    // -----------------------------
    // Preço (ÚNICA correção necessária)
    // -----------------------------
    const appointmentPriceInCents = Math.round(
      parsedInput.appointmentsPriceInCents
    )

    // -----------------------------
    // INSERT / UPDATE
    // -----------------------------
    await db
      .insert(doctorsTable)
      .values({
        id: parsedInput.id,
        clinicId: session.user.clinic.id,
        name: parsedInput.name,
        specialty: parsedInput.specialty,
        availableFromWeekDay: parsedInput.availableFromWeekDay,
        availableToWeekDay: parsedInput.availableToWeekDay,
        availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
        availableToTime: availableToTimeUTC.format("HH:mm:ss"),
        appointmentPriceInCents,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          name: parsedInput.name,
          specialty: parsedInput.specialty,
          availableFromWeekDay: parsedInput.availableFromWeekDay,
          availableToWeekDay: parsedInput.availableToWeekDay,
          availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
          availableToTime: availableToTimeUTC.format("HH:mm:ss"),
          appointmentPriceInCents,
        },
      })

    revalidatePath("/doctors")
  })
