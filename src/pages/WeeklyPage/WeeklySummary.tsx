import { getPercentColor } from "@/lib/utils";

import Card from "@/components/ui/card";
import DonutProgress from "@/components/ui/DonutProgress";

interface Completion {
  rate: number;
  total: number;
  completed: number;
}

interface Props {
  completion: Completion | undefined;
  //   totalMinutes: number;
}

export default function WeeklySummary({ completion }: Props) {
  if (!completion) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card title="행동 달성률">
        <div className="mt-4 flex items-center justify-center gap-8">
          <DonutProgress
            value={completion.rate}
            size={120}
            label={`${completion.rate * 100}%`}
            progressClass={getPercentColor(completion.rate)}
          />
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div>전체 행동:</div>
            <div className="font-mono font-semibold">{completion.total}</div>
            <div>완료 행동:</div>
            <div className="font-mono font-semibold">
              {completion.completed}
            </div>
            <div>남은 행동:</div>
            <div className="font-mono font-semibold">
              {completion.total - completion.completed}
            </div>
          </div>
        </div>
      </Card>
      {/* <Card title="시간 달성률">
        <div className="mt-4 flex items-center justify-center gap-6">
          <DonutProgress
            value={0.6}
            size={120}
            label="60%"
            progressClass={getPercentColor(0.7)}
          />
          <div className="grid grid-cols-2 gap-1 text-sm">
            <div>전체 목표:</div>
            <div className="font-semibold">3</div>
            <div>달성 목표:</div>
            <div className="font-semibold">6</div>
          </div>
        </div>
      </Card> */}
    </div>
  );
}
