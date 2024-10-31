import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

interface PageviewData {
  x: string;
  y: number;
}

interface StatsData {
  pageviews: { value: number; prev: number };
  visitors: { value: number; prev: number };
  visits: { value: number; prev: number };
  bounces: { value: number; prev: number };
  totaltime: { value: number; prev: number };
}

interface ChartData {
  date: string;
  pageviews: number;
  visitors: number;
}

interface ChartConfigItem {
  label: string;
  color: string;
}

interface ChartConfig {
  [key: string]: ChartConfigItem;
}

interface MetricCardProps {
  title: string;
  value: number;
  prevValue: number;
  icon: React.ReactNode;
  format?: 'number' | 'time';
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

const StatsChart: React.FC = () => {
  const [data, setData] = React.useState<ChartData[]>([]);
  const [stats, setStats] = React.useState<StatsData | null>(null);
  const [activeMetric, setActiveMetric] = React.useState<
    'pageviews' | 'visitors'
  >('pageviews');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      try {
        const controller = new AbortController();
        const signal = controller.signal;

        const requestOptions = {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          signal,
          mode: 'cors' as RequestMode
        };

        const pageviewsResponse = await fetch(
          `https://cloud.umami.is/share/XaGIKEcmjDG5Inp2/imartin.dev/pageviews?` +
            `startAt=${startDate.getTime()}&` +
            `endAt=${endDate.getTime()}&` +
            `unit=day&timezone=${encodeURIComponent(Intl.DateTimeFormat().resolvedOptions().timeZone)}`,
          requestOptions
        );

        if (!pageviewsResponse.ok) {
          throw new Error(`HTTP error! status: ${pageviewsResponse.status}`);
        }

        const pageviewsData = (await pageviewsResponse.json()) as {
          pageviews: PageviewData[];
          sessions: PageviewData[];
        };

        const statsResponse = await fetch(
          `https://cloud.umami.is/share/XaGIKEcmjDG5Inp2/imartin.dev/stats?` +
            `startAt=${startDate.getTime()}&` +
            `endAt=${endDate.getTime()}`,
          requestOptions
        );

        if (!statsResponse.ok) {
          throw new Error(`HTTP error! status: ${statsResponse.status}`);
        }

        const statsData = (await statsResponse.json()) as StatsData;
        setStats(statsData);

        const transformedData = pageviewsData.pageviews.map((item) => ({
          date: item.x,
          pageviews: item.y,
          visitors: pageviewsData.sessions.find((s) => s.x === item.x)?.y || 0
        }));

        setData(transformedData);

        return () => {
          controller.abort();
        };
      } catch (error) {
        console.error(
          'Error fetching data:',
          error instanceof Error ? error.message : 'An unknown error occurred'
        );
      } finally {
        setIsLoading(false);
      }
      return undefined;
    };

    fetchData();
  }, []);

  const chartConfig: ChartConfig = {
    pageviews: {
      label: 'Page Views',
      color: 'hsl(var(--chart-1))'
    },
    visitors: {
      label: 'Unique Visitors',
      color: 'hsl(var(--chart-2))'
    }
  };

  const getPercentageChange = (current: number, previous: number): number => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    prevValue,
    icon,
    format = 'number'
  }) => {
    const percentChange = getPercentageChange(value, prevValue);
    const isPositive = percentChange >= 0;

    return (
      <div className='flex flex-col gap-1 rounded-lg border p-4'>
        <div className='flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>{title}</span>
          {icon}
        </div>
        <div className='flex items-baseline gap-2'>
          <span className='text-2xl font-bold'>
            {format === 'time' ? formatTime(value) : value?.toLocaleString()}
          </span>
          <span
            className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? (
              <TrendingUp className='h-4 w-4' />
            ) : (
              <TrendingDown className='h-4 w-4' />
            )}
            {Math.abs(percentChange).toFixed(1)}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className='border-b p-6'>
        <div className='flex flex-col gap-2'>
          <CardTitle>Umami Analytics</CardTitle>
          <CardDescription>Last 7 days of traffic</CardDescription>
        </div>
      </CardHeader>

      {isLoading && (
        <div className='flex items-center justify-center p-6'>
          <div className='text-sm text-muted-foreground'>
            Loading analytics data...
          </div>
        </div>
      )}

      {!isLoading && stats && (
        <div className='grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3'>
          <MetricCard
            title='Page Views'
            value={stats.pageviews.value}
            prevValue={stats.pageviews.prev}
            icon={<TrendingUp className='h-4 w-4 text-muted-foreground' />}
          />
          <MetricCard
            title='Unique Visitors'
            value={stats.visitors.value}
            prevValue={stats.visitors.prev}
            icon={<TrendingUp className='h-4 w-4 text-muted-foreground' />}
          />
          <MetricCard
            title='Total Sessions'
            value={stats.visits.value}
            prevValue={stats.visits.prev}
            icon={<TrendingUp className='h-4 w-4 text-muted-foreground' />}
          />
          <MetricCard
            title='Bounce Rate'
            value={Math.round((stats.bounces.value / stats.visits.value) * 100)}
            prevValue={Math.round(
              (stats.bounces.prev / stats.visits.prev) * 100
            )}
            icon={<TrendingDown className='h-4 w-4 text-muted-foreground' />}
          />
          <MetricCard
            title='Time on Site'
            value={stats.totaltime.value}
            prevValue={stats.totaltime.prev}
            icon={<Clock className='h-4 w-4 text-muted-foreground' />}
            format='time'
          />
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <CardContent className='border-t px-2 sm:p-6'>
          <div className='mb-4 flex gap-4'>
            {(
              Object.entries(chartConfig) as [
                keyof typeof chartConfig,
                ChartConfigItem
              ][]
            ).map(([key, config]) => (
              <button
                key={key}
                data-active={activeMetric === key}
                className='relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium data-[active=true]:bg-muted'
                onClick={() =>
                  setActiveMetric(key as 'pageviews' | 'visitors')
                }>
                <div
                  className='h-2 w-2 rounded-full'
                  style={{ backgroundColor: config.color }}
                />
                {config.label}
              </button>
            ))}
          </div>

          <ChartContainer
            config={chartConfig}
            className='aspect-auto h-[250px] w-full'>
            <BarChart
              data={data}
              margin={{
                left: 12,
                right: 12
              }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey='date'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value: string) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className='w-[150px]'
                    nameKey={activeMetric}
                    labelFormatter={(value: string) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      });
                    }}
                  />
                }
              />
              <Bar
                dataKey={activeMetric}
                fill={`var(--color-${activeMetric})`}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  );
};

export default StatsChart;
