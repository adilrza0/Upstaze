import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Home,
  BarChart2,
  Users,
  FileText,
  DollarSign,
  Shield,
  HelpCircle,
  LogOut,
  Plus,
  Copy,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ServerMonitor from "./ServerMonitor";
import ContentManagement from "./ContentManagement";
// import UserManagement from './user-management'

// import ServicesMarketplace from './services-marketplace'
// import FinancialManagement from './financial-management'
// import SecurityCompliance from './security-compliance'
// import HelpCenter from './help-center'


export default function AdminDashboard() {
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");

  const sidebarItems = [
    { icon: Home, label: "Dashboard" },
    { icon: Users, label: "User Management" },
    { icon: FileText, label: "Content Management" },
    { icon: BarChart2, label: "Services Marketplace" },
    { icon: DollarSign, label: "Financial Management" },
    { icon: Shield, label: "Security & Compliance" },
    { icon: HelpCircle, label: "Help Center" },
  ];

  const workspaces = [
    {
      name: "Active Startups",
      projects: 16,
      updated: "16/05/2024",
      deployed: 4,
      archived: 1,
      draft: 2,
    },
    {
      name: "New Signups",
      projects: 16,
      updated: "04/05/2024",
      deployed: 3,
      archived: 8,
      draft: 9,
    },
    {
      name: "Pending Approvals",
      projects: 16,
      updated: "12/05/2024",
      deployed: 1,
      archived: 7,
      draft: 2,
    },
    // {
    //   name: "System Health",
    //   projects: 16,
    //   updated: "25/05/2024",
    //   deployed: 5,
    //   archived: 2,
    //   draft: 8,
    // },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "User Management":
        return <UserManagement />;
      case "Content Management":
        return <ContentManagement admin={true} />;
      case "Services Marketplace":
        return <ServicesMarketplace />;
      case "Financial Management":
        return <FinancialManagement />;
      case "Security & Compliance":
        return <SecurityCompliance />;
      case "Help Center":
        return <HelpCenter />;
      default:
        return (
          <>
            {showWelcomeBanner && (
              <Card className="mb-6 bg-gradient-to-r from-primary/80 to-primary/95 text-primary-foreground">
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Welcome, Admin 👋
                    </h2>
                    <p>
                      Start to manage your team members and their account
                      permissions here.
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      className="bg-primary-foreground text-primary"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Create New Workspace
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-white"
                      onClick={() => setShowWelcomeBanner(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Workspaces{" "}
                  <Badge variant="secondary" className="ml-2">
                    06
                  </Badge>
                </h2>
                <Input
                  type="search"
                  placeholder="Search"
                  className="max-w-xs"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workspaces.map((workspace, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-semibold">
                        {workspace.name}
                      </CardTitle>
                      <Badge variant="secondary">
                        {workspace.projects} Projects
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        UPDATED: {workspace.updated}
                      </p>
                      <div className="flex space-x-2 mb-4">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          Deployed x {workspace.deployed}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800"
                        >
                          Archived x {workspace.archived}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-800"
                        >
                          Draft x {workspace.draft}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="ml-auto">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                 <ServerMonitor/>
              </div>
             
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-foreground p-4 text-background/70">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground  p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-primary rounded-full mr-2"></div>
          <span className="text-xl font-bold">Upstaze</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Button
                
                //   variant={activePage === item.label ? "secondary" : "ghost"}
                  className={cn(
                    activePage === item.label
                      ? "bg-primary hover:bg-primary/70   text-primary-foreground"
                      : "hover:bg-primary/20 bg-foreground text-primary-foreground/70",
                    "w-full justify-start  "
                  )}
                  onClick={() => setActivePage(item.label)}
                >
                  <item.icon className="mr-2 h-4 w-4"  />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          {/* <Card className="bg-gray-50 mb-4">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">Introducing Upstaze</h3>
              <p className="text-sm text-gray-600 mb-2">AI is mature enough to add value to most industries.</p>
              <Button size="sm" className="w-full">Watch 1 min demo</Button>
            </CardContent>
          </Card> */}
          <Button variant="ghost" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto bg-background text-foreground rounded-xl scrollbar-hide">
        <div className="max-w-6xl mx-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{activePage}</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Bell className="h-4 w-4 mr-2" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Page Content */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
// Shared by ~1Kg5ZHVVqd55318BIwiAtMmN
