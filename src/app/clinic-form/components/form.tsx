"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createClinic } from "@/actions/create-clinic";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const clinicFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

const ClinicForm = () => {
  const form = useForm<z.infer<typeof clinicFormSchema>>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
        name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof clinicFormSchema>) => {
    try{
      await createClinic(data.name)
    } catch (error) {
      if (isRedirectError(error)){
        return;
      }
      console.error(error)
      toast.error("Erro ao criar clínica.")
    }
  };

  return (
    <>
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nome</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Único footer */}
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          Cancelar
        </Button>
      </DialogClose>

      <Button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Criar clínica
      </Button>
    </DialogFooter>
  </form>
</Form>
    </>
  );
};

export default ClinicForm;
