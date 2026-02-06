import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-8 text-center">
          <AlertCircle className="h-16 w-16 mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This page is a placeholder and will be built with global analytics,
            user management, and system administration features.
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </motion.div>
    </div>
  );
}
