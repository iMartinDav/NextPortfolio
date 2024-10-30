'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

export const description = 'An interactive bar chart for Umami analytics';

// Define the type for the chart data
interface ChartDataItem {
  date: string;
  views: number;
}

const chartConfig = {
  views: {
    label: 'Page Views'
  }
} satisfies ChartConfig;

export default function StatsChart() {
  const [chartData, setChartData] = React.useState<ChartDataItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | null>(null);

  // Use environment variables for Umami
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiBaseUrl = process.env.NEXT_PUBLIC_UMAMI_BASE_URL;

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Calculate timestamps for the past 7 days
        const endAt = Date.now();
        const startAt = endAt - 7 * 24 * 60 * 60 * 1000; // 7 days ago

        const response = await fetch(
          `${umamiBaseUrl}/api/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        
        // Format the data to match the chart's requirements
        const formattedData: ChartDataItem[] = [
          { date: 'Page Views', views: data.pageviews.value },
          { date: 'Previous Page Views', views: data.pageviews.prev },
          { date: 'Visitors', views: data.visitors.value },
          { date: 'Previous Visitors', views: data.visitors.prev },
          { date: 'Visits', views: data.visits.value },
          { date: 'Previous Visits', views: data.visits.prev },
          { date: 'Bounces', views: data.bounces.value },
          { date: 'Previous Bounces', views: data.bounces.prev },
          { date: 'Total Time', views: data.totaltime.value },
          { date: 'Previous Total Time', views: data.totaltime.prev },
        ];

        setChartData(formattedData);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [websiteId, umamiBaseUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Umami Analytics</CardTitle>
          <CardDescription>
            Showing total visitors for the last 7 days
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                />
              }
            />
            <Bar
              dataKey="views"
              fill={`var(--color-views)`}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
