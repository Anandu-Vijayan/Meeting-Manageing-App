import React from "react";
import SideNavBar from "./_components/SideNavBar";
import DashboardHeader from "./_components/Dashboardheader";
import { Toaster } from "@/components/ui/sonner";
import Dashboard from "./page";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="hidden md:block md:w-64 bg-slate-50 h-screen fixed">
        <SideNavBar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        <Dashboard/>
        <Toaster/>
      </div>
    </div>
  );
}

export default DashboardLayout;
