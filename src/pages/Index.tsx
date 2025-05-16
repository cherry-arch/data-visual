
import Dashboard from "@/components/Dashboard";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Route, Routes } from "react-router-dom";
import AboutPage from "@/pages/About";

const Index = () => {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
};

export default Index;
