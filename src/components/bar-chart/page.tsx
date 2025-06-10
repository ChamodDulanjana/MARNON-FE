import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"

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

const chartData = [
    { month: "January", men: 186, women: 80, kid: 102 },
    { month: "February", men: 305, women: 200, kid: 150 },
    { month: "March", men: 237, women: 120, kid: 187 },
    { month: "April", men: 73, women: 190, kid: 123 },
    { month: "May", men: 209, women: 130, kid: 157 },
    { month: "June", men: 214, women: 140, kid: 194 },
    { month: "July", men: 198, women: 160, kid: 176 },/*
    { month: "August", men: 250, women: 145, kid: 163 },
    { month: "September", men: 221, women: 180, kid: 142 },
    { month: "October", men: 194, women: 130, kid: 188 },
    { month: "November", men: 233, women: 175, kid: 129 },
    { month: "December", men: 205, women: 190, kid: 171 },*/
];

const chartConfig = {
    men: {
        label: "Men",
        color: "var(color-men-barChart)",
    },
    women: {
        label: "Women",
        color: "var(color-women-barChart)",
    },
    kid: {
        label: "Kid",
        color: "var(color-kid-barChart)",
    },
} satisfies ChartConfig

const BarChartForProduct = () => {
    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Sales by Month</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px] lg:h-[350px] xl:h-[400px] min-[2000px]:h-[500px] w-full">
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar dataKey="men" fill="var(--color-men-barChart)" radius={4} />
                            <Bar dataKey="women" fill="var(--color-women-barChart)" radius={4} />
                            <Bar dataKey="kid" fill="var(--color-kid-barChart)" radius={4} />

                            <ChartLegend content={<ChartLegendContent />} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default BarChartForProduct;