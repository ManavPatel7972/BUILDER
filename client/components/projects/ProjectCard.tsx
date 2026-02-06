import { motion } from "framer-motion";
import { ChevronRight, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project, getStatusColor } from "@/lib/mockData";
import { formatCurrency, formatPercent } from "@/lib/formatters";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  index?: number;
}

export const ProjectCard = ({
  project,
  onViewDetails,
  index = 0,
}: ProjectCardProps) => {
  const spentPercent = (project.spent / project.budget) * 100;
  const overBudget = spentPercent > 100;

  const departmentColors: Record<string, string> = {
    Transportation: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "Parks & Recreation":
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Utilities: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Education: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    "Social Services":
      "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-6 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge className={departmentColors[project.department] || departmentColors.Transportation}>
                {project.department}
              </Badge>
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{project.location}</span>
        </div>

        {/* Budget Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Budget Usage
            </span>
            <span className={`text-xs font-semibold ${
              overBudget
                ? "text-red-600 dark:text-red-400"
                : "text-gray-700 dark:text-gray-300"
            }`}>
              {formatPercent(spentPercent)}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(spentPercent, 100)}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className={`h-full ${
                overBudget
                  ? "bg-gradient-to-r from-red-500 to-red-600"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500"
              }`}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>{formatCurrency(project.spent)}</span>
            <span>{formatCurrency(project.budget)}</span>
          </div>
        </div>

        {/* Project Progress */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Completion
            </span>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {project.progress}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500 pt-2 border-t border-gray-100 dark:border-slate-800">
          <span>{new Date(project.startDate).toLocaleDateString()}</span>
          <Users className="h-3 w-3" />
          <span>{new Date(project.endDate).toLocaleDateString()}</span>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onViewDetails(project)}
          className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
        >
          View Details
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
