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
      <footer className="p-10 text-center bg-gray-800 text-white">
        Made with 💖 by Dhiman Majumdar
      </footer>
    </div>
  );
};

export default AppLayout;
