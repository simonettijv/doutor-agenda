"use client";

import { ColumnDef } from "@tanstack/react-table";

import { patientsTable } from "@/db/schema";

import PatientsTableActions from "./table-action";

export const patientsTableColumns: ColumnDef<typeof patientsTable.$inferSelect>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
  },
  {
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => (params.getValue() === "male" ? "Masculino" : "Feminino"),
  },
  {
    id: "actions",
    header: "Ações",
    cell: (params) => <PatientsTableActions patient={params.row.original} />,
  },
];