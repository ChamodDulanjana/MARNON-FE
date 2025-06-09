import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import {useState} from "react";


const chartData = [
    { date: "2025-04-01", men: 448, women: 187, kid: 265 },
    { date: "2025-04-02", men: 383, women: 108, kid: 109 },
    { date: "2025-04-03", men: 257, women: 124, kid: 219 },
    { date: "2025-04-04", men: 202, women: 118, kid: 280 },
    { date: "2025-04-05", men: 274, women: 145, kid: 181 },
    { date: "2025-04-06", men: 121, women: 245, kid: 234 },
    { date: "2025-04-07", men: 256, women: 189, kid: 355 },
    { date: "2025-04-08", men: 320, women: 150, kid: 130 },
    { date: "2025-04-09", men: 195, women: 261, kid: 144 },
    { date: "2025-04-10", men: 210, women: 132, kid: 258 },
    { date: "2025-04-11", men: 238, women: 140, kid: 222 },
    { date: "2025-04-12", men: 291, women: 139, kid: 170 },
    { date: "2025-04-13", men: 209, women: 175, kid: 216 },
    { date: "2025-04-14", men: 310, women: 168, kid: 122 },
    { date: "2025-04-15", men: 220, women: 246, kid: 134 },
    { date: "2025-04-16", men: 174, women: 210, kid: 216 },
    { date: "2025-04-17", men: 246, women: 130, kid: 224 },
    { date: "2025-04-18", men: 185, women: 289, kid: 126 },
    { date: "2025-04-19", men: 308, women: 133, kid: 159 },
    { date: "2025-04-20", men: 141, women: 283, kid: 176 },
    { date: "2025-04-21", men: 159, women: 245, kid: 196 },
    { date: "2025-04-22", men: 205, women: 232, kid: 163 },
    { date: "2025-04-23", men: 301, women: 150, kid: 149 },
    { date: "2025-04-24", men: 271, women: 123, kid: 206 },
    { date: "2025-04-25", men: 277, women: 175, kid: 148 },
    { date: "2025-04-26", men: 124, women: 237, kid: 239 },
    { date: "2025-04-27", men: 168, women: 226, kid: 206 },
    { date: "2025-04-28", men: 165, women: 203, kid: 232 },
    { date: "2025-04-29", men: 183, women: 155, kid: 262 },
    { date: "2025-04-30", men: 139, women: 224, kid: 237 },
    { date: "2025-05-01", men: 205, women: 161, kid: 234 },
    { date: "2025-05-02", men: 293, women: 158, kid: 149 },
    { date: "2025-05-03", men: 250, women: 126, kid: 224 },
    { date: "2025-05-04", men: 146, women: 207, kid: 247 },
    { date: "2025-05-05", men: 315, women: 138, kid: 147 },
    { date: "2025-05-06", men: 277, women: 154, kid: 169 },
    { date: "2025-05-07", men: 288, women: 180, kid: 132 },
    { date: "2025-05-08", men: 313, women: 145, kid: 142 },
    { date: "2025-05-09", men: 265, women: 138, kid: 197 },
    { date: "2025-05-10", men: 230, women: 229, kid: 141 },
    { date: "2025-05-11", men: 271, women: 138, kid: 191 },
    { date: "2025-05-12", men: 189, women: 167, kid: 244 },
    { date: "2025-05-13", men: 212, women: 244, kid: 144 },
    { date: "2025-05-14", men: 272, women: 133, kid: 195 },
    { date: "2025-05-15", men: 263, women: 169, kid: 168 },
    { date: "2025-05-16", men: 150, women: 180, kid: 270 },
    { date: "2025-05-17", men: 180, women: 260, kid: 160 },
    { date: "2025-05-18", men: 308, women: 174, kid: 118 },
    { date: "2025-05-19", men: 264, women: 144, kid: 192 },
    { date: "2025-05-20", men: 259, women: 167, kid: 174 },
    { date: "2025-05-21", men: 210, women: 135, kid: 255 },
    { date: "2025-05-22", men: 160, women: 185, kid: 255 },
    { date: "2025-05-23", men: 232, women: 209, kid: 159 },
    { date: "2025-05-24", men: 194, women: 123, kid: 283 },
    { date: "2025-05-25", men: 208, women: 165, kid: 227 },
    { date: "2025-05-26", men: 314, women: 162, kid: 124 },
    { date: "2025-05-27", men: 291, women: 144, kid: 165 },
    { date: "2025-05-28", men: 160, women: 233, kid: 207 },
    { date: "2025-05-29", men: 263, women: 183, kid: 154 },
    { date: "2025-05-30", men: 126, women: 192, kid: 282 },
    { date: "2025-05-31", men: 138, women: 259, kid: 203 },
    { date: "2025-06-01", men: 169, women: 240, kid: 191 },
    { date: "2025-06-02", men: 221, women: 141, kid: 238 },
    { date: "2025-06-03", men: 280, women: 190, kid: 130 },
    { date: "2025-06-04", men: 154, women: 232, kid: 214 },
    { date: "2025-06-05", men: 287, women: 185, kid: 128 },
    { date: "2025-06-06", men: 203, women: 293, kid: 104 },
    { date: "2025-06-07", men: 298, women: 175, kid: 127 },
    { date: "2025-06-08", men: 302, women: 178, kid: 120 },
    { date: "2025-06-09", men: 125, women: 185, kid: 290 },
];


const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    men: {
        label: "Men",
        color: "var(color-men)",
    },
    women: {
        label: "Women",
        color: "var(color-women)",
    },
    kid: {
        label: "Kid",
        color: "var(color-kid)",
    },
} satisfies ChartConfig

const AreaChartForSales = () => {
    const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>("men")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date().toISOString().split('T')[0];
        const daysToSubtract = 90 // Default to 90 days
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <div className='w-full mt-2'>
            <Card>
                <CardHeader className="flex items-center gap-2 space-y-0 border-b py-3 sm:flex-row">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                        <CardTitle>Product Sales</CardTitle>
                        <CardDescription>
                            Showing total sales for the last 3 months
                        </CardDescription>
                    </div>

                    <div className="flex">
                        {["men", "women", "kid"].map((key) => {
                            const chart = key as keyof typeof chartConfig
                            return (
                                <button
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                    onClick={() => setActiveChart(chart)}
                                >
                                    <span className="text-sm text-muted-foreground">
                                      {chartConfig[chart].label}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[300px] w-full"
                    >
                        <AreaChart data={filteredData}>
                            <defs>
                                <linearGradient id="fillmen" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-men)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-men)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillwomen" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-women)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-women)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillkid" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor="var(--color-kid)"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="var(--color-kid)"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }}
                                        indicator="dot"
                                    />
                                }
                            />

                            <Area
                                dataKey={activeChart}
                                type="natural"
                                fill={`url(#fill${activeChart})`}
                                stroke={`var(--color-${activeChart})`}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default AreaChartForSales;