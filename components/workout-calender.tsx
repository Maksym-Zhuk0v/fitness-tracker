"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

type WorkoutCalendarProps = {
  workoutDates: string[];
};

export function WorkoutCalendar({ workoutDates }: WorkoutCalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const workoutDays = workoutDates.map((d) => new Date(d));

  return (
    <div className="p-4">
      <Calendar
        className="border border-border-secondary rounded-2xl"
        mode="single"
        selected={date}
        onSelect={setDate}
        modifiers={{
          workout: workoutDays,
        }}
        modifiersStyles={{
          workout: {
            backgroundColor: "#83f28f",
            color: "white",
            borderRadius: "6px",
          },
        }}
      />
    </div>
  );
}
