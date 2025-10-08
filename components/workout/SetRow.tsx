"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SetRowProps {
  index: number;
  reps: string;
  weight: string;
  onChange: (field: "reps" | "weight", value: string) => void;
  onRemove: () => void;
}

export const SetRow: React.FC<SetRowProps> = ({
  index,
  reps,
  weight,
  onChange,
  onRemove,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
      <div className="w-20">Сет {index + 1}</div>
      <Input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => onChange("reps", e.target.value)}
        className="w-full sm:w-24"
      />
      <Input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => onChange("weight", e.target.value)}
        className="w-full sm:w-24"
      />
      <Button type="button" size="sm" variant="ghost" onClick={onRemove}>
        Delete
      </Button>
    </div>
  );
};
