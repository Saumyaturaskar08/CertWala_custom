import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

function MainLayout() {
  const [isCollapsed, setIsCollapsed] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="h-screen flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-40
            md:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <Sidebar
        isCollapsed={isCollapsed}
        sidebarOpen={sidebarOpen}
        closeSidebar={() =>
          setSidebarOpen(false)
        }
      />

      <div className="flex-1 flex flex-col">
        <Navbar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          setSidebarOpen={setSidebarOpen}
        />

        <main
          className="
            flex-1
            p-4 md:p-6
            bg-[#F5F5F5]
            overflow-y-auto
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;