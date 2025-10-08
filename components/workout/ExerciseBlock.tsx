"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SetRow } from "./SetRow";

interface ExerciseBlockProps {
  block: {
    id: string;
    exercise_name: string;
    sets: { reps: string; weight: string }[];
  };
  exercises: any[];
  onExerciseChange: (name: string) => void;
  onAddSet: () => void;
  onRemoveSet: (index: number) => void;
  onSetChange: (index: number, field: "reps" | "weight", value: string) => void;
  onRemoveBlock: () => void;
}

export const ExerciseBlock: React.FC<ExerciseBlockProps> = ({
  block,
  exercises,
  onExerciseChange,
  onAddSet,
  onRemoveSet,
  onSetChange,
  onRemoveBlock,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-3 w-full">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex-1">
            <Label>Exercise</Label>
            <Select
              value={block.exercise_name}
              onValueChange={onExerciseChange}
            >
              <SelectTrigger className="mt-4">
                <SelectValue placeholder="Select exercise..." />
              </SelectTrigger>
              <SelectContent>
                {exercises.map((ex) => (
                  <SelectItem key={ex.id} value={ex.name}>
                    {ex.group} — {ex.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button type="button" size="sm" variant="ghost" onClick={onAddSet}>
              + Set
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={onRemoveBlock}
            >
              Delete exercise
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          {block.sets.map((s, si) => (
            <SetRow
              key={si}
              index={si}
              reps={s.reps}
              weight={s.weight}
              onChange={(field, value) => onSetChange(si, field, value)}
              onRemove={() => onRemoveSet(si)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
