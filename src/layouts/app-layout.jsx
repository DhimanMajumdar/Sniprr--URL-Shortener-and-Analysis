import React from "react";
import { Outlet } from "react-router";
import Header from "../components/header";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4">
        <Outlet />
      </main>
      <footer className="p-6 text-center bg-gray-700 mt-4 text-gray-300 text-sm sm:text-base">
        <div className="space-y-2">
          <p>
            🔗 Empowering smart links and real-time analytics with{" "}
            <span className="font-semibold text-white">Sniprr</span>
          </p>
          <p>
            Track clicks, devices, and locations – all visualized with
            insightful charts 📊
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Crafted by{" "}
            <span className="text-white font-medium">Dhiman Majumdar</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
