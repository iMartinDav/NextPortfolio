import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, TrendingDown, TrendingUp, BarChart as ChartIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Core interfaces
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
  formattedDate?: string;
}

// Constants
const CHART_METRICS = [
  {
    key: 'pageviews',
    label: 'Page Views',
    color: 'hsl(var(--chart-1))',
    icon: <ChartIcon className="h-4 w-4" />
  },
  {
    key: 'visitors',
    label: 'Unique Visitors',
    color: 'hsl(var(--chart-2))',
    icon: <TrendingUp className="h-4 w-4" />
  }
];

function useAnalyticsData() {
  const [data, setData] = React.useState<ChartData[]>([]);
  const [stats, setStats] = React.useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);
  const [isRealData, setIsRealData] = React.useState<boolean>(true);
  
  // Reset and retry function
  const resetAndRetry = React.useCallback(() => {
    setIsLoading(true);
    setError(null);
    fetchData();
  }, []);

  // Fetch data function using the Umami public share URL via our proxy
  const fetchData = React.useCallback(async () => {
    try {
      // Use our API proxy to fetch from Umami's public share URL
      const response = await fetch('/api/fetch-umami-stats', {
        method: 'GET',
        headers: { 
          'Accept': 'application/json',
          'Cache-Control': 'no-cache, no-store'
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`API Error (${response.status}): ${await response.text()}`);
      }

      const apiData = await response.json();
      
      // Check if we have an error in the response
      if (apiData.error) {
        throw new Error(apiData.error);
      }
      
      // Check if this is real or simulated data
      setIsRealData(!!apiData.isRealData);
      
      // Handle field name differences if any
      const normalizedStats = {
        pageviews: apiData.pageviews || { value: 0, prev: 0 },
        visitors: apiData.visitors || { value: 0, prev: 0 },
        visits: apiData.visits || { value: 0, prev: 0 },
        bounces: apiData.bounces || { value: 0, prev: 0 },
        totaltime: apiData.totaltime || apiData.totalTime || { value: 0, prev: 0 }
      };
      
      // Use real daily data from API if available
      let chartData: ChartData[] = [];
      
      if (apiData.dailyData?.pageviews?.length > 0) {
        // Process the real daily data
        chartData = apiData.dailyData.pageviews.map((item: PageviewData) => {
          const date = new Date(item.x);
          const matchingSession = apiData.dailyData.sessions.find(
            (s: PageviewData) => s.x === item.x
          );
          
          return {
            date: item.x,
            formattedDate: date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            }),
            pageviews: item.y,
            visitors: matchingSession?.y || 0
          };
        });
      } else {
        // Fallback to distribution algorithm if no daily data
        const distributionFactors = [0.13, 0.15, 0.17, 0.18, 0.16, 0.11, 0.10];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(today.getDate() - i);
          const dayOfWeek = date.getDay();
          const factor = distributionFactors[(dayOfWeek + 1) % 7];
          
          chartData.push({
            date: date.toISOString().split('T')[0],
            formattedDate: date.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            }),
            pageviews: Math.round(normalizedStats.pageviews.value * factor),
            visitors: Math.round(normalizedStats.visitors.value * factor)
          });
        }
      }

      setData(chartData);
      setStats(normalizedStats);
      setLastUpdated(new Date());
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to fetch analytics data:', errorMessage);
      setError(errorMessage);
      setData([]);
      setStats(null);
      setIsRealData(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect for data fetching - only run once on mount
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, stats, isLoading, error, resetAndRetry, lastUpdated, isRealData };
}

// Helper function for formatting time
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: number;
  prevValue: number;
  icon: React.ReactNode;
  format?: 'number' | 'time';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, prevValue, icon, format = 'number' }) => {
  const percentChange = prevValue ? ((value - prevValue) / prevValue) * 100 : 0;
  const isPositive = percentChange >= 0;
  const displayValue = format === 'time' ? formatTime(value) : value.toLocaleString();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-1 rounded-lg border p-4 hover:shadow-sm transition-shadow"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold">{displayValue}</span>
        <span
          className={`flex items-center gap-1 text-sm ${isPositive ? 'text-[#42EFD8]' : 'text-red-500'}`}
          title={`${isPositive ? 'Increased' : 'Decreased'} by ${Math.abs(percentChange).toFixed(1)}%`}
        >
          {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          <span>{Math.abs(percentChange).toFixed(1)}%</span>
        </span>
      </div>
    </motion.div>
  );
};

// Main StatsChart component
export const StatsChart: React.FC = () => {
  const { data, stats, isLoading, error, resetAndRetry, lastUpdated, isRealData } = useAnalyticsData();
  const [activeMetric, setActiveMetric] = React.useState('pageviews');
  
  // Current metric configuration
  const currentMetric = CHART_METRICS.find(m => m.key === activeMetric) || CHART_METRICS[0];

  // Empty state when no data
  if (!isLoading && !data.length) {
    return (
      <Card>
        <CardHeader className="border-b p-6">
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            {error ? 'Error loading analytics data' : 'No analytics data available'}
          </CardDescription>
        </CardHeader>
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <ChartIcon className="h-10 w-10 text-muted-foreground mb-4" />
          {error && (
            <p className="text-muted-foreground mb-4">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={resetAndRetry}
            className="rounded bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b p-6">
        <div className="flex flex-col gap-2">
          <CardTitle>Analytics Dashboard</CardTitle>
          <div className="flex items-center justify-between">
            <CardDescription>Last 7 days of site traffic</CardDescription>
          </div>
        </div>
      </CardHeader>

      {/* Metrics section */}
      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats && (
          <>
            <MetricCard
              title="Page Views"
              value={stats.pageviews.value}
              prevValue={stats.pageviews.prev}
              icon={<ChartIcon className="h-4 w-4" />}
            />
            <MetricCard
              title="Unique Visitors"
              value={stats.visitors.value}
              prevValue={stats.visitors.prev}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Total Sessions"
              value={stats.visits.value}
              prevValue={stats.visits.prev}
              icon={<TrendingUp className="h-4 w-4 rotate-45" />}
            />
            <MetricCard
              title="Bounce Rate"
              value={Math.round((stats.bounces.value / stats.visits.value) * 100)}
              prevValue={Math.round((stats.bounces.prev / stats.visits.prev) * 100)}
              icon={<TrendingDown className="h-4 w-4" />}
            />
            <MetricCard
              title="Time on Site"
              value={stats.totaltime.value}
              prevValue={stats.totaltime.prev}
              icon={<Clock className="h-4 w-4" />}
              format="time"
            />
          </>
        )}
      </div>

      {/* Chart section */}
      {data.length > 0 && (
        <CardContent className="border-t px-2 pt-6 pb-2 sm:p-6">
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex gap-2">
                {CHART_METRICS.map(metric => (
                  <button
                    key={metric.key}
                    type="button"
                    aria-pressed={activeMetric === metric.key}
                    className={`
                      relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium
                      transition-all
                      ${activeMetric === metric.key 
                        ? 'bg-muted text-foreground' 
                        : 'hover:bg-muted/50 text-muted-foreground'}
                    `}
                    onClick={() => setActiveMetric(metric.key)}
                  >
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                    {metric.label}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                {lastUpdated && (
                  <span className="text-xs text-muted-foreground">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                    {!isRealData && (
                      <span className="ml-2 rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-[10px] font-medium">
                        SIMULATED DATA
                      </span>
                    )}
                  </span>
                )}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={data}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis 
                  dataKey="formattedDate"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={20}
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background border rounded-md p-2 shadow-md text-sm">
                          <p className="font-medium">
                            {new Date(data.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {currentMetric.label}: <span className="font-medium text-foreground">
                              {data[activeMetric]}
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey={activeMetric}
                  fill={currentMetric.color}
                  radius={[4, 4, 0, 0]}
                  animationDuration={500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent text-primary" />
        </div>
      )}
    </Card>
  );
};

export default StatsChart;
