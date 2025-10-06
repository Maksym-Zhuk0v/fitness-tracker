"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateWorkout from "../create-workout";

export const CreateWorkoutDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Создать тренировку</Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-3xl sm:max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Создать тренировку</DialogTitle>
        </DialogHeader>
        <CreateWorkout setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
