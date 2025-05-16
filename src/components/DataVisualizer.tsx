
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart as PieChartIcon, BarChart3, LineChart } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomBarChart from "./BarChart";
import CustomPieChart from "./PieChart";
import CustomAreaChart from "./AreaChart";

type DataPoint = {
  name: string;
  value: number;
  [key: string]: any;
};

type UploadedData = {
  columns: string[];
  rows: Record<string, any>[];
  fileName: string;
  fileType: "csv" | "excel" | "pdf" | null;
};

interface DataVisualizerProps {
  data: UploadedData | null;
}

const DataVisualizer: React.FC<DataVisualizerProps> = ({ data }) => {
  const [visualizationType, setVisualizationType] = useState<string>("bar");
  const [primaryColumn, setPrimaryColumn] = useState<string>("");
  const [valueColumn, setValueColumn] = useState<string>("");
  const [secondaryColumn, setSecondaryColumn] = useState<string | null>(null);
  const [processedData, setProcessedData] = useState<DataPoint[]>([]);
  const [categories, setCategories] = useState<{key: string, name: string, color: string}[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Reset selections when data changes
    if (data && data.columns.length > 0) {
      setPrimaryColumn(data.columns[0] || "");
      setValueColumn(
        data.columns.find(col => {
          // Try to find a numeric column
          const sample = data.rows[0]?.[col];
          return !isNaN(Number(sample));
        }) || data.columns[1] || ""
      );
      setSecondaryColumn(null);
      processData();
    }
  }, [data]);

  useEffect(() => {
    processData();
  }, [primaryColumn, valueColumn, secondaryColumn]);

  const processData = () => {
    if (!data || !data.rows.length || !primaryColumn || !valueColumn) {
      setProcessedData([]);
      return;
    }

    setIsAnimating(true);

    if (secondaryColumn && visualizationType === "bar") {
      // For grouped bar charts with a secondary dimension
      const uniqueSecondaryValues = [...new Set(data.rows.map(row => String(row[secondaryColumn])))];
      
      // Create categories for the legend
      const newCategories = uniqueSecondaryValues.map((value, index) => ({
        key: String(value),
        name: String(value),
        color: getColorByIndex(index)
      }));
      
      setCategories(newCategories);
      
      // Group by primary column
      const groupedData = data.rows.reduce((acc, row) => {
        const primaryKey = String(row[primaryColumn]);
        if (!acc[primaryKey]) {
          acc[primaryKey] = { name: primaryKey };
          
          // Initialize all secondary values to 0
          uniqueSecondaryValues.forEach(secValue => {
            acc[primaryKey][secValue] = 0;
          });
        }
        
        const secValue = String(row[secondaryColumn]);
        acc[primaryKey][secValue] = Number(row[valueColumn]) || 0;
        
        return acc;
      }, {} as Record<string, any>);
      
      const finalData = Object.values(groupedData);
      
      // Limit data to a reasonable size for better visualization if needed
      const maxEntries = 20; // Adjust based on visual needs
      const truncatedData = finalData.length > maxEntries ? 
        finalData.slice(0, maxEntries) : finalData;
        
      setProcessedData(truncatedData);
    } else {
      // For simple charts (bar, pie, area) without secondary dimension
      const aggregatedData: Record<string, number> = {};
      
      data.rows.forEach(row => {
        const key = String(row[primaryColumn]);
        if (!aggregatedData[key]) {
          aggregatedData[key] = 0;
        }
        aggregatedData[key] += Number(row[valueColumn]) || 0;
      });
      
      // Convert to array and sort by value in descending order for better visualization
      let chartData = Object.entries(aggregatedData)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
        
      // Limit to a reasonable number of segments for better visualization
      const maxEntries = visualizationType === 'pie' ? 10 : 20;
      chartData = chartData.slice(0, maxEntries);
      
      setProcessedData(chartData);
      
      // For bar charts with a single series
      setCategories([{
        key: "value",
        name: valueColumn,
        color: "#8884d8"
      }]);
    }
    
    // Simulate data processing animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const getColorByIndex = (index: number): string => {
    const colors = [
      "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", 
      "#00c49f", "#ffbb28", "#ff8042", "#a4de6c", "#d0ed57"
    ];
    return colors[index % colors.length];
  };

  const renderChart = () => {
    if (!data || !processedData.length) {
      return (
        <div className="flex justify-center items-center h-64 text-muted-foreground">
          No data available for visualization
        </div>
      );
    }

    const title = `${valueColumn} by ${primaryColumn}`;

    switch (visualizationType) {
      case "bar":
        return (
          <div className="animate-enter">
            <CustomBarChart
              title={title}
              data={processedData}
              categories={categories}
              className="w-full"
            />
          </div>
        );
      case "pie":
        return (
          <div className="animate-enter">
            <CustomPieChart
              title={title}
              data={processedData}
              className="w-full"
            />
          </div>
        );
      case "area":
        return (
          <div className="animate-enter">
            <CustomAreaChart
              title={title}
              data={processedData}
              dataKey="value"
              strokeColor="#8884d8"
              className="w-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (!data) {
    return (
      <Card className="w-full animate-fade-in">
        <CardHeader>
          <CardTitle>Data Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64 text-muted-foreground">
            Upload a file to visualize data
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Visualizing: </span>
          <span className="text-primary font-semibold">{data.fileName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label htmlFor="visualization-type">Chart Type</Label>
            <Tabs 
              defaultValue="bar" 
              value={visualizationType} 
              onValueChange={setVisualizationType}
              className="w-full mt-1"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="bar" className="flex items-center gap-2 hover:bg-primary/20 transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  <span>Bar</span>
                </TabsTrigger>
                <TabsTrigger value="pie" className="flex items-center gap-2 hover:bg-primary/20 transition-colors">
                  <PieChartIcon className="h-4 w-4" />
                  <span>Pie</span>
                </TabsTrigger>
                <TabsTrigger value="area" className="flex items-center gap-2 hover:bg-primary/20 transition-colors">
                  <LineChart className="h-4 w-4" />
                  <span>Area</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            <Label htmlFor="primary-column">Category Field</Label>
            <Select 
              value={primaryColumn} 
              onValueChange={setPrimaryColumn}
            >
              <SelectTrigger className="w-full mt-1 hover:border-primary/50 transition-all">
                <SelectValue placeholder="Select a field" />
              </SelectTrigger>
              <SelectContent>
                {data.columns.map(column => (
                  <SelectItem key={column} value={column}>
                    {column}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="value-column">Value Field</Label>
            <Select 
              value={valueColumn} 
              onValueChange={setValueColumn}
            >
              <SelectTrigger className="w-full mt-1 hover:border-primary/50 transition-all">
                <SelectValue placeholder="Select a value field" />
              </SelectTrigger>
              <SelectContent>
                {data.columns.map(column => (
                  <SelectItem key={column} value={column}>
                    {column}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {visualizationType === "bar" && (
          <div className="mb-6">
            <Label htmlFor="secondary-column">Group By (Optional)</Label>
            <Select 
              value={secondaryColumn || "none"} 
              onValueChange={(value) => setSecondaryColumn(value === "none" ? null : value)}
            >
              <SelectTrigger className="w-full mt-1 hover:border-primary/50 transition-all">
                <SelectValue placeholder="Select a grouping field (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {data.columns
                  .filter(col => col !== primaryColumn && col !== valueColumn)
                  .map(column => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mt-4">
          <Button
            onClick={processData}
            className="mb-6 hover-scale relative overflow-hidden group"
          >
            <span className="absolute w-full h-full top-0 left-0 bg-primary/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            <span className="relative">Refresh Visualization</span>
          </Button>
        </div>

        {isAnimating ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          renderChart()
        )}
      </CardContent>
    </Card>
  );
};

export default DataVisualizer;
