import {
  LayoutDashboard,
  Palette,
  X,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Custom+",
    path: "/custom-plus",
    icon: Palette,
  },
];

function Sidebar({
  isCollapsed,
  sidebarOpen,
  closeSidebar,
}) {
  return (
    <aside
      className={`
        fixed md:relative
        top-0 left-0
        h-screen
        bg-[#2F2F2F]
        text-white
        z-50

        transition-all
        duration-300

        ${
          isCollapsed
            ? "md:w-20"
            : "md:w-64"
        }

        w-64

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
      `}
    >
      <div
        className="
          h-14
          border-b
          border-white/10
          flex
          items-center
          justify-between
          px-4
        "
      >
        {!isCollapsed ? (
          <h2
            className="
              text-lg
              font-bold
              text-[#FFDAB9]
            "
          >
            CertWala
          </h2>
        ) : (
          <h2
            className="
              text-lg
              font-bold
              text-[#FFDAB9]
            "
          >
            C
          </h2>
        )}

        <button
          onClick={closeSidebar}
          className="md:hidden"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map(
          (item) => (
            <SidebarItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
            />
          )
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;