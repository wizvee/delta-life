import { RocketIcon, CalendarIcon, ListIcon, StarIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectDetail() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-2 flex items-center gap-3">
        <RocketIcon className="h-6 w-6 text-gray-500" />
        <h1 className="text-3xl font-bold">Marketing Campaign</h1>
      </div>
      {/* Status + Meta */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-gray-500">
          <StarIcon className="h-4 w-4" /> Priority
          <span className="ml-1 text-gray-400">Empty</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">Status</span>
          <Badge variant="destructive" className="ml-1">
            Not started
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <CalendarIcon className="h-4 w-4" /> Due date
          <span className="ml-1 text-gray-400">Empty</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <ListIcon className="h-4 w-4" /> Progress
          <span className="ml-1 font-medium">0%</span>
          <Progress value={0} className="ml-2 h-2 w-16 bg-gray-100" />
        </div>
      </div>
      {/* Tabs */}
      <Tabs defaultValue="overview" className="mb-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="meeting">Meeting Notes</TabsTrigger>
        </TabsList>
      </Tabs>
      {/* Overview Card */}
      <Card className="mb-6">
        <CardContent className="py-6">
          <div className="mb-4 text-lg font-semibold">Properties</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div className="flex items-center">
              <span className="mr-2 text-gray-500">Type</span>
              <span className="text-gray-400">Empty</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-500">Start date</span>
              <span className="text-gray-400">Empty</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-500">Completion date</span>
              <span className="text-gray-400">Empty</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-500">Days left</span>
              <span className="text-gray-400">No due date</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-500">Tasks progress</span>
              <span className="text-gray-400">No tasks assigned</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2 text-gray-500">Notes</span>
              <span className="text-gray-400">Empty</span>
            </div>
            <div className="col-span-2">
              <Button variant="ghost" size="sm">
                12 more properties
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Tasks Section */}
      <Card>
        <CardContent className="py-4">
          <div className="mb-2 font-semibold">Tasks</div>
          <p className="text-sm text-gray-600">
            The <span className="font-semibold">"Add Tasks"</span> button below
            allows you to automatically add tasks from a pre-existing task
            template and link them to the project you're currently working on.
            To use this button, you first...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
