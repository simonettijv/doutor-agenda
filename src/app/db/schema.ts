
import { Many, relations } from "drizzle-orm";
import { pgTable, text, uuid, timestamp, integer, time, pgEnum,  } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),

});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
    usersToClinics: many(usersToClinicsTable),
}))

export const clinicsTable = pgTable("clinics", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const usersToClinicsTable = pgTable ("users_to_clinics", {
    userId: uuid("user_id").notNull().references(() => usersTable.id),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const usersToClinicsTableRelations = relations(usersToClinicsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [usersToClinicsTable.userId],
        references: [usersTable.id],
    }),
    
    clinic: one(clinicsTable, {
        fields: [usersToClinicsTable.clinicId],
        references: [clinicsTable.id],
    }),
}));

export const clinicsTableRelations = relations(clinicsTable, ({ many }) => ({
    doctors: many(doctorsTable),
    patients: many(patientsTable),
    appointments: many(appointmentsTable),
    usersToClinics: many(usersToClinicsTable),
}));

export const doctorsTable = pgTable("doctors",{
    id: uuid("id").defaultRandom().primaryKey(),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    avatarImageUrl: text("avatar_image_url"),
    // 1- monday, 2- tuesday, 3- wednesday, 4- thursday, 5- friday, 6- saturday, 0- sunday
    availableFromWeekDay: integer("available_from_week_day").notNull(), 
    availableToWeekDay: integer("available_to_week_day").notNull(),
    availableFromTime: time("available_from_time").notNull(),
    availableToTime: time("available_to_time").notNull(),
    specialty: text("specialty").notNull(),
    appointmentPriceInCents: integer("appointment_price_in_cents").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const doctorsTableRelations = relations(doctorsTable, ({ many, one }) => ({
    clinic: one(clinicsTable,{
        fields: [doctorsTable.clinicId],
        references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable),
}))

export const patientSexEnum = pgEnum("patient_sex_", ["male", "female"]);

export const patientsTable = pgTable("patients", {
    id: uuid("id").defaultRandom().primaryKey(),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phoneNumber: text("phone_number").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    sex: patientSexEnum("sex").notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const patientsTableRelations = relations(patientsTable, ({ one, many }) => ({
    clinic: one(clinicsTable,{
        fields: [patientsTable.clinicId],
        references: [clinicsTable.id],
    }),
    appointments: many(appointmentsTable),
}))

export const appointmentsTable = pgTable("appointments", {
    id: uuid("id").defaultRandom().primaryKey(),
    date: timestamp("date").notNull(),
    clinicId: uuid("clinic_id").notNull().references(() => clinicsTable.id, { onDelete: "cascade" }),
    patientsId: uuid("patients_id").notNull().references(() => patientsTable.id, { onDelete: "cascade" }),
    doctorId: uuid("doctor_id").notNull().references(() => doctorsTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
});

export const appointmentsTableRelations = relations(appointmentsTable, ({ one }) => ({
    clinic: one(clinicsTable, {
        fields: [appointmentsTable.clinicId],
        references: [clinicsTable.id],
    }),

    doctor: one(doctorsTable, {
        fields: [appointmentsTable.doctorId],
        references: [doctorsTable.id],
    }),

    patient: one(patientsTable, {
        fields: [appointmentsTable.patientsId],
        references: [patientsTable.id],
    }),
}));
