"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell, ResponsiveContainer } from "recharts";
import { AlertCircle, LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Types
interface MetricValue {
  value: number;
  prev: number;
}

interface StatsData {
  pageviews: MetricValue;
  visitors: MetricValue;
  visits: MetricValue;
  bounces: MetricValue;
  totalTime: MetricValue;
}

interface ChartDataPoint {
  type: string;
  visitors: number;
  fill: string;
  percentChange: number;
}

// Constants
const COLORS = {
  pageviews: "hsl(230, 95%, 65%)",
  visitors: "hsl(280, 95%, 65%)",
  visits: "hsl(330, 95%, 65%)",
  bounces: "hsl(30, 95%, 65%)",
  totalTime: "hsl(180, 95%, 65%)",
};

const METRIC_LABELS = {
  pageviews: "Page Views",
  visitors: "Unique Visitors",
  visits: "Total Visits",
  bounces: "Bounce Rate",
  totalTime: "Avg. Time (min)",
};

// Utility functions
const calculatePercentChange = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

const formatDuration = (minutes: number): string => {
  if (minutes < 1) return `${Math.round(minutes * 60)}s`;
  if (minutes < 60) return `${Math.round(minutes)}m`;
  return `${Math.round(minutes / 60)}h ${Math.round(minutes % 60)}m`;
};

const formatMetricValue = (key: string, value: number): string => {
  if (key === "totalTime") return formatDuration(value);
  if (key === "bounces") return `${value.toFixed(1)}%`;
  return value.toLocaleString();
};

export default function StatsChart() {
  const [stats, setStats] = React.useState<StatsData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchStats = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/fetch-umami-stats");
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [fetchStats]);

  const chartData: ChartDataPoint[] = React.useMemo(() => {
    if (!stats) return [];
    
    return Object.entries(stats).map(([key, value]) => ({
      type: key,
      visitors: value.value,
      fill: COLORS[key as keyof typeof COLORS],
      percentChange: calculatePercentChange(value.value, value.prev),
    }));
  }, [stats]);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-64">
          <LoaderCircle className="w-8 h-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <button 
            onClick={() => fetchStats()} 
            className="mt-4 text-sm text-muted-foreground hover:text-foreground underline"
          >
            Try again
          </button>
        </CardContent>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Website Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Object.entries(stats).map(([key, data]) => (
            <div
              key={key}
              className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <h3 className="text-sm font-medium text-muted-foreground">
                {METRIC_LABELS[key as keyof typeof METRIC_LABELS]}
              </h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  {formatMetricValue(key, data.value)}
                </span>
                <span
                  className={`text-sm ${
                    data.value >= data.prev ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {calculatePercentChange(data.value, data.prev).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="type"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
                <Label
                  content={({ viewBox }) => (
                    <text
                      x={(viewBox as any)?.cx ?? 0}
                      y={(viewBox as any)?.cy ?? 0}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={(viewBox as any).cx}
                        y={(viewBox as any)?.cy}
                        className="text-3xl font-bold fill-foreground"
                      >
                        {stats.visits.value.toLocaleString()}
                      </tspan>
                      <tspan
                        x={(viewBox as any)?.cx}
                        y={(viewBox as any)?.cy + 25}
                        className="text-sm fill-muted-foreground"
                      >
                        Total Visits
                      </tspan>
                    </text>
                  )}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
