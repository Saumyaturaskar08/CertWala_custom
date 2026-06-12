import { NavLink } from "react-router-dom";

function SidebarItem({
  to,
  icon: Icon,
  label,
  isCollapsed,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        flex
        items-center
        ${
          isCollapsed
            ? "justify-center"
            : "gap-3"
        }
        px-4
        py-3
        rounded-xl

        ${
          isActive
            ? "bg-[#20B2AA]"
            : "hover:bg-white/10"
        }
      `
      }
    >
      <Icon size={20} />

      {!isCollapsed && (
        <span>{label}</span>
      )}
    </NavLink>
  );
}

export default SidebarItem;
