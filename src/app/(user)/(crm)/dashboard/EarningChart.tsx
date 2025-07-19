"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCsDispatch, useCsSelector } from "@/cs-redux"
import { DashboardAction } from "@/cs-redux/thunks/app/crm/dashboard.action"




const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--chart-2)",
    }
} satisfies ChartConfig;


const TIME_PERIODS = [
    // `value` is always in days
    { label: "30 Days", value: "30" },
    { label: "90 Days", value: "90" },
    { label: "1 Year", value: "365" },
] as const;

export default function EarningChart() {
    const dispatch = useCsDispatch();
    const { mainGraphData } = useCsSelector(state => state.dashboard);
    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("revenue")
    const [selectedTimePeriod, setSelectedTimePeriod] = React.useState<{ label: string; value: string }>(TIME_PERIODS[0]) // in days. Default 30

    React.useEffect(() => {
        dispatch(DashboardAction.getMainGraphData({ timePeriod: Number(selectedTimePeriod.value) }))
    }, [selectedTimePeriod.value, dispatch])

    return (
        <Card className="py-0">
            <CardHeader className="flex items-start justify-between py-5 border-b  sm:flex-row">
                <div className="">
                    <CardTitle>Revenue Graph</CardTitle>
                    <CardDescription>
                        Showing total revenue for the last {selectedTimePeriod?.label}
                    </CardDescription>
                </div>
                <div>
                    <Select value={selectedTimePeriod.value} onValueChange={(p) => setSelectedTimePeriod(TIME_PERIODS.find(_p => _p.value === p)!)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Time Period" />
                        </SelectTrigger>
                        <SelectContent>
                            {TIME_PERIODS.map((p, i) => (
                                <SelectItem value={p.value} key={i + 3625875}>{p.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full"  >
                    <BarChart accessibilityLayer data={mainGraphData} margin={{ left: 12, right: 12, }} >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-IN", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={18}
                            tickFormatter={(value) =>
                                `₹ ${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
                            }
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="revenue"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
