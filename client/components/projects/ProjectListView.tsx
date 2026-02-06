import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project, getStatusColor } from "@/lib/mockData";
import { formatCurrency, formatPercent } from "@/lib/formatters";

interface ProjectListViewProps {
  projects: Project[];
  onViewDetails: (project: Project) => void;
  isLoading?: boolean;
}

export const ProjectListView = ({
  projects,
  onViewDetails,
  isLoading = false,
}: ProjectListViewProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-14 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse"
            />
          ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">
          No projects found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 font-semibold text-sm text-gray-700 dark:text-gray-300">
        <div className="col-span-3">Project</div>
        <div className="col-span-2">Department</div>
        <div className="col-span-2">Budget</div>
        <div className="col-span-2">Progress</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1"></div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100 dark:divide-slate-800">
        {projects.map((project, index) => {
          const spentPercent = (project.spent / project.budget) * 100;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onViewDetails(project)}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer items-center"
            >
              {/* Project Name - Mobile Header + Content */}
              <div className="col-span-1 md:col-span-3">
                <p className="md:hidden text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Project
                </p>
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {project.name}
                </p>
              </div>

              {/* Department */}
              <div className="col-span-1 md:col-span-2">
                <p className="md:hidden text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Department
                </p>
                <Badge variant="outline" className="text-xs">
                  {project.department}
                </Badge>
              </div>

              {/* Budget */}
              <div className="col-span-1 md:col-span-2">
                <p className="md:hidden text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Budget
                </p>
                <div className="space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(project.budget)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatPercent(spentPercent)} spent
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="col-span-1 md:col-span-2">
                <p className="md:hidden text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Progress
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-10">
                    {project.progress}%
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-1 md:col-span-2">
                <p className="md:hidden text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  Status
                </p>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>

              {/* Action Button */}
              <div className="col-span-1 flex justify-end">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
