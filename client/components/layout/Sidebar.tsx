import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Map,
  FileText,
  Users,
  Building2,
  PieChart,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/authStore";
import { useAppStore } from "@/store/appStore";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["citizen", "officer", "admin"],
  },
  {
    label: "Projects",
    icon: Briefcase,
    href: "/projects",
    roles: ["citizen", "officer", "admin"],
  },
  {
    label: "Map View",
    icon: Map,
    href: "/map",
    roles: ["citizen", "officer", "admin"],
  },
  {
    label: "Reports",
    icon: FileText,
    href: "/reports",
    roles: ["citizen", "officer", "admin"],
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
    roles: ["admin"],
  },
  {
    label: "Departments",
    icon: Building2,
    href: "/admin/departments",
    roles: ["admin"],
  },
  {
    label: "Budget Allocation",
    icon: PieChart,
    href: "/admin/budget",
    roles: ["admin"],
  },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuthStore();
  const { sidebarOpen, setSidebarOpen, isMobile } = useAppStore();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile, setSidebarOpen]);

  const visibleItems = menuItems.filter(
    (item) => !user || item.roles.includes(user.role)
  );

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : isMobile ? -280 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed lg:relative top-16 left-0 h-[calc(100vh-64px)] w-64 bg-sidebar dark:bg-sidebar border-r border-sidebar-border z-40",
          "flex flex-col overflow-y-auto",
          !sidebarOpen && isMobile && "-translate-x-full"
        )}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 p-2 hover:bg-sidebar-accent rounded-lg transition-colors lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8">
          <div className="space-y-2">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors relative",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-sidebar-primary rounded-r-lg"
                    />
                  )}
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <div className="text-xs text-sidebar-foreground/60 space-y-1">
            <p>Budget Dashboard v1.0</p>
            <p>© 2024 Municipality</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
