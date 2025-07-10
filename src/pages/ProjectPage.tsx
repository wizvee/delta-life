import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProjectPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center gap-3">
        <RocketIcon className="h-6 w-6 text-gray-600" />
        <h1 className="text-3xl font-semibold">Marketing Campaign</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 md:grid-cols-4">
        <div>
          <div className="font-medium">Priority</div>
          <div className="text-gray-500">Empty</div>
        </div>
        <div>
          <div className="font-medium">Status</div>
          <Badge variant="destructive">Not started</Badge>
        </div>
        <div>
          <div className="font-medium">Due date</div>
          <div className="text-gray-500">Empty</div>
        </div>
        <div>
          <div className="font-medium">Progress</div>
          <Progress value={0} className="h-2" />
          <div className="text-right text-xs">0%</div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-muted">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="ideas">Ideas</TabsTrigger>
          <TabsTrigger value="notes">Meeting Notes</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-medium">Properties</h2>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <Property label="Type" value="Empty" />
            <Property label="Start date" value="Empty" />
            <Property label="Completion date" value="Empty" />
            <Property label="Days left" value="No due date" icon />
            <Property label="Tasks progress" value="No tasks assigned" icon />
            <Property label="Notes" value="Empty" />
          </div>
        </CardContent>
      </Card>

      <div className="text-sm">
        <h2 className="mb-2 font-medium">Tasks</h2>
        <p>
          The <strong>"Add Tasks"</strong> button below allows you to
          automatically add tasks from a pre-existing task template and link
          them to the project you're currently working on. To use this button,
          you first
        </p>
      </div>
    </div>
  );
}

function Property({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <span className="font-medium">{label}</span>
      <span className="flex items-center gap-1 text-gray-500">
        {icon && <span className="text-gray-400">\u2716</span>} {value}
      </span>
    </div>
  );
}

function RocketIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4.5 12.5a5.38 5.38 0 0 1-1.2-5.6c1.2-2.8 4.3-5 8.7-5s7.5 2.2 8.7 5c1.2 2.8.2 6.1-1.6 8.1L12 22l-5.3-5.3a5.3 5.3 0 0 1-2.2-4.2z" />
    </svg>
  );
}
