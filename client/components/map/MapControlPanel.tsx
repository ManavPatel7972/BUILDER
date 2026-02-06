import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MapControlPanelProps {
  departments: string[];
  selectedDepartment: string | null;
  onDepartmentChange: (dept: string | null) => void;
  selectedStatus: string | null;
  onStatusChange: (status: string | null) => void;
  showHeatmap: boolean;
  onHeatmapToggle: (show: boolean) => void;
  showDelayedOnly: boolean;
  onDelayedOnlyToggle: (show: boolean) => void;
  isCollapsed: boolean;
  onCollapseToggle: (collapsed: boolean) => void;
}

const statuses = ["Planned", "Active", "Delayed", "Completed"];

export const MapControlPanel = ({
  departments,
  selectedDepartment,
  onDepartmentChange,
  selectedStatus,
  onStatusChange,
  showHeatmap,
  onHeatmapToggle,
  showDelayedOnly,
  onDelayedOnlyToggle,
  isCollapsed,
  onCollapseToggle,
}: MapControlPanelProps) => {
  return (
    <>
      {/* Mobile/Floating Panel */}
      <motion.div
        className="fixed left-4 top-24 md:left-6 md:top-28 z-20 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 shadow-lg overflow-hidden max-w-sm w-full md:max-w-xs"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {/* Header */}
        <div
          onClick={() => onCollapseToggle(!isCollapsed)}
          className="p-4 bg-gradient-to-r from-primary to-blue-600 text-white cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <span className="font-semibold">Map Controls</span>
          </div>
          <motion.button
            animate={{ rotate: isCollapsed ? 0 : 180 }}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            {isCollapsed ? (
              <ChevronDown className="h-5 w-5" />
            ) : (
              <ChevronUp className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        {/* Content */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="p-4 space-y-4"
            >
              {/* Department Filter */}
              <div>
                <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">
                  Department
                </h4>
                <div className="space-y-2">
                  <Button
                    variant={selectedDepartment === null ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => onDepartmentChange(null)}
                  >
                    All Departments
                  </Button>
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      variant={selectedDepartment === dept ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start text-xs"
                      onClick={() => onDepartmentChange(dept)}
                    >
                      {dept}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
                <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase mb-2">
                  Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedStatus === null ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => onStatusChange(null)}
                  >
                    All
                  </Badge>
                  {statuses.map((status) => (
                    <Badge
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      className="cursor-pointer text-xs"
                      onClick={() => onStatusChange(status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Toggle Filters */}
              <div className="pt-2 border-t border-gray-200 dark:border-slate-700 space-y-2">
                <button
                  onClick={() => onHeatmapToggle(!showHeatmap)}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Budget Heatmap
                  </span>
                  {showHeatmap ? (
                    <Eye className="h-4 w-4 text-primary" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                <button
                  onClick={() => onDelayedOnlyToggle(!showDelayedOnly)}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Delayed Only
                  </span>
                  {showDelayedOnly ? (
                    <Eye className="h-4 w-4 text-red-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={() => {
                  onDepartmentChange(null);
                  onStatusChange(null);
                  onHeatmapToggle(false);
                  onDelayedOnlyToggle(false);
                }}
              >
                Reset All
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
