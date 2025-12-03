import React from "react";
import { NavLink, useNavigate } from "react-router";
import { Home, Box, UserPlus, User, type LucideIcon, LogOut } from "lucide-react";

type SidebarItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

const items: SidebarItem[] = [
  {
    label: "Profile",
    to: "/profile",
    icon: User,
  },
  {
    label: "Create User",
    to: "/users/create",
    icon: UserPlus,
  },
  {
    label: "Products",
    to: "/inventories",
    icon: Box,
  },
  {
    label: "Categories",
    to: "/categories",
    icon: Home,
  },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/");
    onClose();
  }

  return (
    <>
      {/* BACKDROP – cuma di mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-blue-300 text-blue-900 shadow-xl transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:h-screen lg:translate-x-0 lg:rounded-r-3xl lg:shadow-2xl",
        ].join(" ")}
      >
        
        {/* MENU LIST */}
        <nav className="mt-6 flex-1 space-y-1 px-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-green-50 text-[#163c77] shadow-md"
                      : "hover:bg-white/10 hover:shadow-inner hover:text-[#163c77]",
                  ].join(" ")
                }
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4" />
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="border-t border-white/10 px-3 py-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium to-blue-950-text-50 transition hover:bg-red-500/20 hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white-500/40">
              <LogOut className="h-4 w-4" />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
