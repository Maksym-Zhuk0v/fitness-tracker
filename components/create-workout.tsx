"use client";

import React, { useEffect, useState } from "react";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ExerciseBlock } from "./workout/ExerciseBlock";
import { useUserStore } from "@/hooks/useUserStore";
import { fetchExercises } from "@/services/exerciseService";
import { addSetsToWorkout, createWorkout } from "@/services/workoutService";

const CreateWorkout = ({ setOpen }: { setOpen?: (open: boolean) => void }) => {
  const { user } = useUserStore();
  const [workoutName, setWorkoutName] = useState("");
  const [exercises, setExercises] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    fetchExercises().then(setExercises).catch(console.error);
  }, []);

  const addExerciseBlock = () => {
    setBlocks((prev) => [
      ...prev,
      { id: Date.now().toString(), exercise_name: "", sets: [] },
    ]);
  };

  const handleSave = async () => {
    console.log(user);
    if (!user) return;
    console.log(user);
    const workout = await createWorkout(user.id, workoutName);
    await addSetsToWorkout(
      workout.id,
      blocks.map((b) => ({
        exercise_name: b.exercise_name,
        sets: b.sets.map((s: { reps: string; weight: string }) => ({
          reps: Number(s.reps),
          weight: Number(s.weight),
        })),
      }))
    );
    setWorkoutName("");
    setBlocks([]);
    setOpen?.(false);
  };
  return (
    <div>
      <div className="space-y-4 mt-2">
        <Input
          placeholder="Имя тренировки"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Упражнения</h3>
          <Button type="button" size="sm" onClick={addExerciseBlock}>
            + Добавить упражнение
          </Button>
        </div>

        {blocks.map((block, bi) => (
          <ExerciseBlock
            key={block.id}
            block={block}
            exercises={exercises}
            onExerciseChange={(name) =>
              setBlocks((prev) =>
                prev.map((b, i) =>
                  i === bi ? { ...b, exercise_name: name } : b
                )
              )
            }
            onAddSet={() =>
              setBlocks((prev) =>
                prev.map((b, i) =>
                  i === bi
                    ? { ...b, sets: [...b.sets, { reps: "", weight: "" }] }
                    : b
                )
              )
            }
            onRemoveSet={(si) =>
              setBlocks((prev) =>
                prev.map((b, i) =>
                  i === bi
                    ? {
                        ...b,
                        sets: b.sets.filter(
                          (_: { reps: string; weight: string }, idx: number) =>
                            idx !== si
                        ),
                      }
                    : b
                )
              )
            }
            onSetChange={(si, field, value) =>
              setBlocks((prev) =>
                prev.map((b, i) =>
                  i === bi
                    ? {
                        ...b,
                        sets: b.sets.map(
                          (s: { reps: string; weight: string }, idx: number) =>
                            idx === si ? { ...s, [field]: value } : s
                        ),
                      }
                    : b
                )
              )
            }
            onRemoveBlock={() =>
              setBlocks((prev) => prev.filter((_, i) => i !== bi))
            }
          />
        ))}

        <Button
          className="w-full"
          disabled={
            !workoutName ||
            blocks.length === 0 ||
            blocks.some((b) => !b.exercise_name) ||
            blocks.some((b) => b.sets.length === 0) ||
            blocks.some((b) =>
              b.sets.some(
                (s: { reps: string; weight: string }) => !s.reps || !s.weight
              )
            )
          }
          onClick={handleSave}
        >
          Сохранить тренировку
        </Button>
      </div>
    </div>
  );
};

export default CreateWorkout;
