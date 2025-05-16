
// Mock data for the dashboard
export const generateTimeSeriesData = (
  days = 30,
  initialValue = 100,
  volatility = 0.1,
  trend = 0.01
) => {
  const data = [];
  let currentValue = initialValue;

  for (let i = 0; i < days; i++) {
    // Add random fluctuation with a trend
    const change = currentValue * volatility * (Math.random() - 0.5) + currentValue * trend;
    currentValue += change;
    currentValue = Math.max(0, currentValue); // Ensure value doesn't go negative

    const date = new Date();
    date.setDate(date.getDate() - (days - i));

    data.push({
      name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(currentValue),
      fullDate: date,
    });
  }

  return data;
};

export const salesData = generateTimeSeriesData(30, 1200, 0.08, 0.015);
export const visitsData = generateTimeSeriesData(30, 5000, 0.1, 0.01);
export const conversionData = generateTimeSeriesData(30, 3.5, 0.05, 0.005);
export const revenueData = generateTimeSeriesData(30, 8500, 0.12, 0.02);

export const categoryBreakdown = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Food", value: 20 },
  { name: "Home", value: 15 },
  { name: "Other", value: 5 },
];

export const monthlySales = [
  { name: "Jan", products: 120, services: 80 },
  { name: "Feb", products: 140, services: 90 },
  { name: "Mar", products: 160, services: 100 },
  { name: "Apr", products: 180, services: 110 },
  { name: "May", products: 200, services: 120 },
  { name: "Jun", products: 220, services: 130 },
  { name: "Jul", products: 240, services: 140 },
  { name: "Aug", products: 260, services: 150 },
  { name: "Sep", products: 280, services: 160 },
  { name: "Oct", products: 300, services: 170 },
  { name: "Nov", products: 320, services: 180 },
  { name: "Dec", products: 340, services: 190 },
];

export const userDemographics = [
  { name: "18-24", male: 15, female: 20 },
  { name: "25-34", male: 25, female: 30 },
  { name: "35-44", male: 20, female: 25 },
  { name: "45-54", male: 15, female: 20 },
  { name: "55+", male: 10, female: 15 },
];

export const dashboardStats = {
  totalSales: {
    value: "$89,240",
    trend: { value: 12.4, isPositive: true },
    description: "Total sales this month",
  },
  activeUsers: {
    value: "2,420",
    trend: { value: 8.2, isPositive: true },
    description: "Active users right now",
  },
  conversionRate: {
    value: "3.8%",
    trend: { value: 1.1, isPositive: true },
    description: "Conversion rate this week",
  },
  averageOrder: {
    value: "$54.32",
    trend: { value: 2.3, isPositive: false },
    description: "Average order value",
  },
};
