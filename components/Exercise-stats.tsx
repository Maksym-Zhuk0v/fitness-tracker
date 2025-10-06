"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type WorkoutStatsProps = {
  stats: {
    group: string;
    count: number;
  }[];
};

const COLORS = ["#4ade80", "#60a5fa", "#f87171", "#facc15", "#a78bfa"];

export function ExerciseStats({ stats }: WorkoutStatsProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Workouts by Muscle Group</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={stats}
                dataKey="count"
                nameKey="group"
                cx="50%"
                cy="50%"
                outerRadius={95}
                label
              >
                {stats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
