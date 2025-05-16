
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Github, Linkedin, Mail, BarChart3, PieChart, LineChart, Upload, Code, Layers, Clock, DollarSign } from "lucide-react";

const AboutPage = () => {
  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 hover-scale">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold animate-fade-in">About Us</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <Card className="animate-enter overflow-hidden shadow-lg border-primary/10 hover:border-primary/30 transition-all duration-300">
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            <CardHeader>
              <CardTitle className="text-2xl">Transforming Data Into Insights</CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed">
              <p className="mb-4">
                Welcome to Data Viz Dashboard – where complex data transforms into clear, actionable insights through 
                beautiful, interactive visualizations.
              </p>
              <p className="mb-4">
                We created this platform with a simple mission: make data visualization accessible to everyone – 
                regardless of technical expertise or budget constraints. Our intuitive interface eliminates the 
                coding barriers that typically accompany data analysis.
              </p>
              <p>
                Simply upload your CSV files and watch as your data comes to life through engaging charts and graphs, 
                revealing patterns and insights that drive smarter decision-making for your business or research.
              </p>
              
              <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { name: "User-Friendly", icon: <Upload className="h-8 w-8 mb-2 text-primary" />, description: "Just upload and visualize – no coding required" },
                  { name: "Chart Variety", icon: <PieChart className="h-8 w-8 mb-2 text-primary" />, description: "Multiple visualization options for your data" },
                  { name: "Affordable", icon: <DollarSign className="h-8 w-8 mb-2 text-primary" />, description: "No expensive API keys or subscriptions needed" },
                  { name: "Real-Time", icon: <Clock className="h-8 w-8 mb-2 text-primary" />, description: "Instant visualization and analysis" }
                ].map((feature, index) => (
                  <div 
                    key={feature.name} 
                    className="p-5 rounded-lg bg-primary/5 text-center hover-scale"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-center">{feature.icon}</div>
                    <h3 className="font-semibold text-xl mb-2">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-enter overflow-hidden shadow-lg hover-card-glow perspective-1000" style={{ animationDelay: "100ms" }}>
            <div className="h-48 w-full overflow-hidden">
              <div className="animated-data-background w-full h-full animate-float"></div>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300">
                  <div className="bg-primary/10 p-3 rounded-full animate-bounce-subtle">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">1. Upload Your Data</h3>
                    <p className="text-muted-foreground">Simply drag and drop your CSV file into our dashboard. Your data is processed securely and never shared.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300">
                  <div className="bg-primary/10 p-3 rounded-full animate-bounce-subtle" style={{ animationDelay: "0.3s" }}>
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">2. Select Your Visualization</h3>
                    <p className="text-muted-foreground">Choose from bar charts, pie charts, line graphs, area charts and more to best represent your data.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300">
                  <div className="bg-primary/10 p-3 rounded-full animate-bounce-subtle" style={{ animationDelay: "0.6s" }}>
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">3. Customize Without Coding</h3>
                    <p className="text-muted-foreground">Adjust colors, labels, and dimensions through our intuitive interface – no programming knowledge needed.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300">
                  <div className="bg-primary/10 p-3 rounded-full animate-bounce-subtle" style={{ animationDelay: "0.9s" }}>
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">4. Analyze and Share</h3>
                    <p className="text-muted-foreground">Gain insights instantly and easily share your visualizations with your team or stakeholders.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="contact" className="scroll-mt-20">
          <Card className="w-full animate-enter" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="text-2xl">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-lg">
                    We'd love to hear from you! Whether you have questions about our platform, need assistance with your data visualization, 
                    or want to suggest new features – our team is here to help.
                  </p>
                  <p className="text-lg">
                    Your feedback is invaluable as we continue to improve and expand our data visualization tools to better serve your needs.
                  </p>
                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <p>contact@datavizdashboard.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Github className="h-5 w-5 text-primary" />
                      </div>
                      <p>github.com/datavizdashboard</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Linkedin className="h-5 w-5 text-primary" />
                      </div>
                      <p>linkedin.com/company/datavizdashboard</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <div className="flex gap-3">
                      {["GitHub", "Twitter", "LinkedIn", "Instagram"].map(social => (
                        <Button key={social} variant="outline" size="icon" className="rounded-full hover-scale">
                          {social === "GitHub" ? <Github className="h-4 w-4" /> :
                           social === "Twitter" ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg> :
                           social === "LinkedIn" ? <Linkedin className="h-4 w-4" /> :
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <Input 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name" 
                      required 
                      className="hover:border-primary/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Input 
                      id="email" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address" 
                      required 
                      className="hover:border-primary/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <Textarea 
                      id="message" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you with your data visualization needs?" 
                      required 
                      className="h-32 hover:border-primary/50 focus:border-primary transition-colors"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2 hover-scale-bold"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <footer className="mt-20 py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Data Viz Dashboard</h2>
              <p className="text-muted-foreground text-sm">Transforming data into actionable insights</p>
            </div>
            <div className="flex gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-scale-micro">Home</Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-scale-micro">About</Link>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-scale-micro">Contact</a>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Data Viz Dashboard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
