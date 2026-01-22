"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale" // 1. Importe o localizador para Português

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      locale={ptBR} // 2. Defina o idioma como Português
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full", // V9 usa month_caption
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10"
        ),
        month_grid: "w-full border-collapse space-y-1", // V9 usa month_grid em vez de table
        weekdays: "flex", // O container dos nomes dos dias (Dom, Seg...)
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex-1 text-center", // Cada nome de dia individual
        week: "flex w-full mt-2", // Cada linha de números
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_button: "size-9 w-full p-0 font-normal transition-none", // Botão interativo dentro da célula
        range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
            const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
            return <Icon className="h-4 w-4" />;
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }