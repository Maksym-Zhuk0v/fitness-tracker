"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GroupSelectProps {
  groups: string[];
  value?: string;
  onChange: (group: string) => void;
}

export default function GroupSelect({
  groups,
  value,
  onChange,
}: GroupSelectProps) {
  const [newGroup, setNewGroup] = useState("");

  const handleChange = (val: string) => {
    if (val === "new") {
      onChange("");
    } else {
      onChange(val);
      setNewGroup("");
    }
  };

  return (
    <div className="space-y-2">
      <Label>Group</Label>
      <Select onValueChange={handleChange} value={value || ""}>
        <SelectTrigger>
          <SelectValue placeholder="Choose group" />
        </SelectTrigger>
        <SelectContent>
          {groups.map((g) => (
            <SelectItem key={g} value={g}>
              {g}
            </SelectItem>
          ))}
          <SelectItem value="new">+ Create new group</SelectItem>
        </SelectContent>
      </Select>

      {value === "" && (
        <Input
          placeholder="New group name"
          value={newGroup}
          onChange={(e) => {
            setNewGroup(e.target.value);
            onChange(e.target.value);
          }}
        />
      )}
    </div>
  );
}
