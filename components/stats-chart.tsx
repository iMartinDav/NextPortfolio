'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

type StatsData = Record<string, { value: number; prev: number }>;

interface RawStatsData {
  [key: string]: { value?: number; prev?: number };
}

const chartConfig: ChartConfig = {
  pageviews: { label: 'Page Views', color: '#00BFAE' },
  visitors: { label: 'Users', color: '#008F8C' },
  visits: { label: 'Visits', color: '#7F00FF' },
  bounces: { label: 'Bounces', color: '#4B0082' },
  totaltime: { label: 'Average Time', color: '#E100FF' }
};

export default function StatsChart() {
  const [stats, setStats] = React.useState<StatsData | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/fetch-umami-stats');
        if (!res.ok) {
          const errorBody = await res.text(); // Read the error response body
          throw new Error(
            `Network response was not ok: ${res.status} ${res.statusText} - ${errorBody}`
          );
        }

        const data: RawStatsData = await res.json();
        const transformedData: StatsData = Object.fromEntries(
          Object.entries(data).map(([key, { value = 0, prev = 0 }]) => [
            key,
            { value, prev }
          ])
        );
        setStats(transformedData);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = React.useMemo(
    () =>
      stats
        ? Object.entries(stats).map(([type, { value }]) => ({
            type,
            visitors: value ?? 0,
            fill: chartConfig[type as keyof typeof chartConfig]?.color
          }))
        : [],
    [stats]
  );

  if (!stats)
    return <div className="flex items-center justify-center h-full" />;

  return (
    <ChartContainer
      config={chartConfig}
      className=""
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="type"
          innerRadius={70}
          strokeWidth={5}
        >
          <Label
            content={(props) => {
              const { viewBox } = props;
              return viewBox && 'cx' in viewBox && 'cy' in viewBox ? (
                <text
                  x={viewBox.cx}
                  y={viewBox.cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground text-5xl font-bold"
                  >
                    {chartData[0]?.visitors}
                  </tspan>
                  <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy || 0) + 24}
                    className="fill-muted-foreground"
                  >
                    Visits
                  </tspan>
                </text>
              ) : null;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
