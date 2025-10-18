import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="p-8 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Welcome to FitTrack</h1>
      </header>

      {/* Top Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle>Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Add your workouts and organize them by type or date.</p>
            <Badge className="mt-2">Overview</Badge>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Track your personal fitness progress over time.</p>
            <Badge className="mt-2">Insights</Badge>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform">
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View a full history of all your workouts and activities.</p>
            <Badge className="mt-2">Archive</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Scrollable Highlights */}
      <Card>
        <CardHeader>
          <CardTitle>Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-40">
            <ul className="space-y-2">
              <li className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span>Motivational tips and reminders</span>
                <ChevronRight />
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span>Upcoming workouts overview</span>
                <ChevronRight />
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-100 rounded">
                <span>Summary of recent progress</span>
                <ChevronRight />
              </li>
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:scale-105 transition-transform h-40 flex flex-col justify-center items-center">
          <p className="text-gray-500 font-semibold">Add Workouts</p>
          <p className="mt-2 text-center">
            Easily log new workouts to keep your routine organized.
          </p>
        </Card>

        <Card className="hover:scale-105 transition-transform h-40 flex flex-col justify-center items-center">
          <p className="text-gray-500 font-semibold">Track Progress</p>
          <p className="mt-2 text-center">
            Monitor your improvements and milestones over time.
          </p>
        </Card>
      </div>

      {/* More Info Blocks */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:scale-105 transition-transform h-32 flex flex-col justify-center items-center">
          <p className="text-gray-400 font-semibold">Workout History</p>
          <p className="mt-1 text-center">
            Review past workouts and stay motivated.
          </p>
        </Card>
        <Card className="hover:scale-105 transition-transform h-32 flex flex-col justify-center items-center">
          <p className="text-gray-400 font-semibold">Goals & Milestones</p>
          <p className="mt-1 text-center">
            Set goals and track how close you are to achieving them.
          </p>
        </Card>
        <Card className="hover:scale-105 transition-transform h-32 flex flex-col justify-center items-center">
          <p className="text-gray-400 font-semibold">Fitness Insights</p>
          <p className="mt-1 text-center">
            Get insights into your workouts and overall performance.
          </p>
        </Card>
      </div>
    </div>
  );
}
