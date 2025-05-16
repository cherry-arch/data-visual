
import React, { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, FilterIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type FilterProps = {
  onFilterChange: (filters: {
    dateRange: { from: Date; to: Date } | undefined;
    category: string;
    dataSource: string;
  }) => void;
};

const DashboardFilter = ({ onFilterChange }: FilterProps) => {
  const [date, setDate] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [category, setCategory] = useState<string>("all");
  const [dataSource, setDataSource] = useState<string>("all");

  const handleDateSelect = (selectedDate: any) => {
    setDate(selectedDate);
    if (selectedDate?.from && selectedDate?.to) {
      handleFilterChange({
        dateRange: { from: selectedDate.from, to: selectedDate.to },
        category,
        dataSource,
      });
    }
  };

  const handleFilterChange = (filters: any) => {
    onFilterChange(filters);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 rounded-lg border bg-card">
      <div className="flex items-center gap-2">
        <FilterIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters</span>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-start text-left font-normal w-full sm:w-auto"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from && date?.to ? (
                <span>
                  {format(date.from, "MMM d, yyyy")} -{" "}
                  {format(date.to, "MMM d, yyyy")}
                </span>
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value);
            handleFilterChange({
              dateRange: date.to ? { from: date.from, to: date.to } : undefined,
              category: value,
              dataSource,
            });
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="food">Food</SelectItem>
            <SelectItem value="home">Home</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={dataSource}
          onValueChange={(value) => {
            setDataSource(value);
            handleFilterChange({
              dateRange: date.to ? { from: date.from, to: date.to } : undefined,
              category,
              dataSource: value,
            });
          }}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Data Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="store">Store</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardFilter;
