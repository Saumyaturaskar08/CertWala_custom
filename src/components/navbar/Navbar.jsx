import {
  Menu,
  Bell,
  UserCircle2,
} from "lucide-react";

function Navbar({
  isCollapsed,
  setIsCollapsed,
  setSidebarOpen,
}) {
  const handleMenuClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(true);
    } else {
      setIsCollapsed(
        !isCollapsed
      );
    }
  };

  return (
    <header
      className="
        h-14
        bg-white
        border-b
        border-gray-200
        px-4 md:px-6
        flex
        items-center
        justify-between
      "
    >
      <div className="flex items-center gap-3">
        <button
          onClick={handleMenuClick}
          className="
            p-2
            rounded-lg
            hover:bg-gray-100
          "
        >
          <Menu size={22} />
        </button>

        <h1
          className="
            text-xl
            font-bold
            text-[#2F2F2F]
          "
        >
          CertWala
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Bell size={20} />

        <UserCircle2
          size={34}
          className="
            text-[#20B2AA]
          "
        />
      </div>
    </header>
  );
}

export default Navbar;