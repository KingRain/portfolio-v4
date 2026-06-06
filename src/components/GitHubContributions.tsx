"use client";

import { useEffect, useState } from "react";
import { isBefore, parseISO, subMonths } from "date-fns";
import { cn } from "@/lib/utils";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "@/components/kibo-ui/contribution-graph";

const GITHUB_USERNAME = "KingRain";
const MONTHS_TO_SHOW = 6;

const githubBlockClassName = cn(
  "data-[level='0']:fill-[#ebedf0] dark:data-[level='0']:fill-[#161b22]",
  "data-[level='1']:fill-[#9be9a8] dark:data-[level='1']:fill-[#0e4429]",
  "data-[level='2']:fill-[#40c463] dark:data-[level='2']:fill-[#006d32]",
  "data-[level='3']:fill-[#30a14b] dark:data-[level='3']:fill-[#26a641]",
  "data-[level='4']:fill-[#216e39] dark:data-[level='4']:fill-[#39d353]"
);

type ContributionsResponse = {
  contributions: Activity[];
  total: Record<string, number>;
};

export default function GitHubContributions() {
  const [data, setData] = useState<Activity[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`
    )
      .then((res) => res.json())
      .then((json: ContributionsResponse) => {
        if (cancelled) return;
        const cutoff = subMonths(new Date(), MONTHS_TO_SHOW);
        const recent = json.contributions.filter(
          (activity) => !isBefore(parseISO(activity.date), cutoff)
        );
        setData(recent);
        setTotalCount(
          recent.reduce((sum, activity) => sum + activity.count, 0)
        );
      })
      .catch(() => {
        if (!cancelled) {
          setData([]);
          setTotalCount(0);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (data.length === 0) {
    return (
      <div className="h-[120px] w-full animate-pulse rounded-md bg-muted/40" />
    );
  }

  return (
    <ContributionGraph
      data={data}
      totalCount={totalCount}
      blockSize={11}
      blockMargin={3}
      fontSize={12}
      className="w-full overflow-hidden"
    >
      <ContributionGraphCalendar>
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
            className={githubBlockClassName}
          />
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter>
        <ContributionGraphTotalCount>
          {({ totalCount }) => (
            <div className="text-muted-foreground">
              {totalCount} contributions in the last {MONTHS_TO_SHOW} months
            </div>
          )}
        </ContributionGraphTotalCount>
        <ContributionGraphLegend>
          {({ level }) => (
            <svg height={11} width={11}>
              <title>{`${level} contributions`}</title>
              <rect
                className={cn("stroke-[1px] stroke-border", githubBlockClassName)}
                data-level={level}
                height={11}
                rx={2}
                ry={2}
                width={11}
              />
            </svg>
          )}
        </ContributionGraphLegend>
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}
