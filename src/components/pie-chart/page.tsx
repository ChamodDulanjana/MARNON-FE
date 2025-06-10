import {Pie, PieChart, Sector} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import {PieSectorDataItem} from "recharts/types/polar/Pie";
import {useState} from "react";

const chartData = [
    { category: "men", sales: 275, fill: "var(--color-men-pieChart)" },
    { category: "women", sales: 200, fill: "var(--color-women-pieChart)" },
    { category: "kid", sales: 187, fill: "var(--color-kid-pieChart)" },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    men: {
        label: "Men",
        color: "var(color-men-pieChart)",
    },
    women: {
        label: "Women",
        color: "var(color-women-pieChart)",
    },
    kid: {
        label: "Kid",
        color: "var(color-kid-pieChart)",
    },
} satisfies ChartConfig

const PieChartByCategory = () => {
    const now = new Date();
    const [date] = useState<{month: string, year: number}>({
        month: now.toLocaleString('default', { month: 'long' }),
        year: now.getFullYear(),
    });

    return (
        <div className="w-1/3 max-lg:w-full">
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-1">
                    <CardTitle>Sales by Product Category</CardTitle>
                    <CardDescription>{`${date.month} - ${date.year}`}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[280px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="sales"
                                nameKey="category"
                                innerRadius={60}
                                strokeWidth={5}
                                activeIndex={0}
                                activeShape={({
                                                  outerRadius = 0,
                                                  ...props
                                              }: PieSectorDataItem) => (
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                )}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>

        </div>
    );
};

export default PieChartByCategory;