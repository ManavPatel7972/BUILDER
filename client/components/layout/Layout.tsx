import { useEffect, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useAppStore } from "@/store/appStore";

interface LayoutProps {
  pageTitle?: string;
  children?: ReactNode;
}

export const Layout = ({ pageTitle = "Dashboard", children }: LayoutProps) => {
  const { setIsMobile, sidebarOpen } = useAppStore();

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [setIsMobile]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Navbar pageTitle={pageTitle} />

      <div className="flex pt-16">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`transition-all duration-300 ${
              sidebarOpen ? "lg:ml-0" : "lg:ml-0"
            }`}
          >
            {children ? children : <Outlet />}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
