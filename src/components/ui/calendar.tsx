"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from 'date-fns/locale'
import { CalendarIcon } from "lucide-react"

interface CalendarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  date?: Date
  onDateChange?: (date: Date) => void
}

export function Calendar({ 
  className,
  date,
  onDateChange,
  ...props 
}: CalendarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.valueAsDate
    if (newDate && onDateChange) {
      onDateChange(newDate)
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <CalendarIcon className="w-4 h-4 text-gray-500" />
      </div>
      <input
        type="date"
        className={cn(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg",
          "focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5",
          "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
          "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )}
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        onChange={handleChange}
        {...props}
      />
    </div>
  )
}