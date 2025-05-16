
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardFilter from "./DashboardFilter";
import StatCard from "./StatCard";
import FileUpload from "./FileUpload";
import DataVisualizer from "./DataVisualizer";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  LineChart, 
  PieChart as PieChartIcon, 
  Upload,
  Info
} from "lucide-react";
import { salesData, visitsData, conversionData, revenueData, categoryBreakdown, monthlySales, userDemographics, dashboardStats } from "@/services/mockData";

type UploadedData = {
  columns: string[];
  rows: Record<string, any>[];
  fileName: string;
  fileType: "csv" | "excel" | "pdf" | null;
};

const Dashboard = () => {
  const [filteredData, setFilteredData] = useState({
    sales: salesData,
    visits: visitsData,
    conversion: conversionData,
    revenue: revenueData,
    categories: categoryBreakdown,
    monthly: monthlySales,
    demographics: userDemographics,
  });

  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("demo");

  const handleFilterChange = (filters: any) => {
    console.log("Filters applied:", filters);
    // In a real application, this would filter the actual data
    // For now, we'll just log the filters and keep using the same data
  };

  const handleDataLoaded = (data: UploadedData) => {
    setUploadedData(data);
    setActiveTab("custom");
  };

  return (
    <div className="min-h-screen bg-background perspective-1000">
      <DashboardHeader />
      <main className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold animate-fade-in">
            Data Visualization Dashboard
            <div className="w-1/2 h-1 bg-gradient-to-r from-primary/80 to-transparent mt-2 rounded-full"></div>
          </h1>
          <Link to="/about">
            <Button variant="outline" className="flex items-center gap-2 hover-scale-bold">
              <Info className="h-4 w-4" />
              <span>About Us</span>
            </Button>
          </Link>
        </div>
        
        <Tabs 
          defaultValue="demo" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full mb-8 animate-fade-in"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger 
              value="demo" 
              className="flex items-center gap-2 data-[state=active]:animate-scale-in group"
            >
              <BarChart3 className="h-4 w-4 group-hover:animate-pulse" />
              <span>Demo Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              className="flex items-center gap-2 data-[state=active]:animate-scale-in group"
            >
              <Upload className="h-4 w-4 group-hover:animate-pulse" />
              <span>Custom Visualization</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="demo" className="animate-enter mt-6">
            <DashboardFilter onFilterChange={handleFilterChange} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
              <StatCard
                title="Total Sales"
                value={dashboardStats.totalSales.value}
                description={dashboardStats.totalSales.description}
                trend={dashboardStats.totalSales.trend}
                icon={<DollarSign className="h-4 w-4" />}
              />
              <StatCard
                title="Active Users"
                value={dashboardStats.activeUsers.value}
                description={dashboardStats.activeUsers.description}
                trend={dashboardStats.activeUsers.trend}
                icon={<Users className="h-4 w-4" />}
              />
              <StatCard
                title="Conversion Rate"
                value={dashboardStats.conversionRate.value}
                description={dashboardStats.conversionRate.description}
                trend={dashboardStats.conversionRate.trend}
                icon={<TrendingUp className="h-4 w-4" />}
              />
              <StatCard
                title="Average Order"
                value={dashboardStats.averageOrder.value}
                description={dashboardStats.averageOrder.description}
                trend={dashboardStats.averageOrder.trend}
                icon={<BarChart3 className="h-4 w-4" />}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in" style={{animationDelay: "100ms"}}>
              <div className="transform transition-transform duration-300 hover:scale-[1.02] hover:-rotate-1">
                <AreaChart
                  title="Sales Trend"
                  data={filteredData.sales}
                  dataKey="value"
                  strokeColor="#8884d8"
                />
              </div>
              <div className="transform transition-transform duration-300 hover:scale-[1.02] hover:rotate-1">
                <AreaChart
                  title="Website Visits"
                  data={filteredData.visits}
                  dataKey="value"
                  strokeColor="#82ca9d"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fade-in" style={{animationDelay: "200ms"}}>
              <div className="transform transition-transform duration-300 hover:scale-[1.02]">
                <PieChart
                  title="Sales by Category"
                  data={filteredData.categories}
                  colors={["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"]}
                />
              </div>
              <div className="col-span-1 lg:col-span-2 transform transition-transform duration-300 hover:scale-[1.02]">
                <BarChart
                  title="Monthly Sales Breakdown"
                  data={filteredData.monthly}
                  categories={[
                    { key: "products", name: "Products", color: "#8884d8" },
                    { key: "services", name: "Services", color: "#82ca9d" },
                  ]}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 animate-fade-in transform transition-transform duration-300 hover:scale-[1.01]" style={{animationDelay: "300ms"}}>
              <BarChart
                title="User Demographics"
                data={filteredData.demographics}
                categories={[
                  { key: "male", name: "Male", color: "#8884d8" },
                  { key: "female", name: "Female", color: "#82ca9d" },
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="animate-enter mt-6">
            <FileUpload onDataLoaded={handleDataLoaded} />
            <DataVisualizer data={uploadedData} />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="mt-20 py-6 bg-muted/30 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Data Viz Dashboard</h2>
              <p className="text-muted-foreground text-sm">Transforming data into insights</p>
            </div>
            
            <div className="flex gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Home</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">About</Link>
              <Link to="/about#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">Contact</Link>
            </div>
            
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Data Viz Dashboard
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
