import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/appStore";
import { mockProjects, Project } from "@/lib/mockData";
import { MapControlPanel } from "@/components/map/MapControlPanel";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MapView() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showDelayedOnly, setShowDelayedOnly] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const { isMobile } = useAppStore();

  // Get unique departments
  const departments = useMemo(
    () => [...new Set(mockProjects.map((p) => p.department))],
    []
  );

  // Filter projects based on controls
  const filteredProjects = useMemo(() => {
    let result = mockProjects;

    if (selectedDepartment) {
      result = result.filter((p) => p.department === selectedDepartment);
    }

    if (selectedStatus) {
      const statusLower = selectedStatus.toLowerCase();
      result = result.filter(
        (p) =>
          p.status.toLowerCase() ===
          (statusLower === "active" ? "ongoing" : statusLower)
      );
    }

    if (showDelayedOnly) {
      result = result.filter((p) => p.status === "delayed");
    }

    return result;
  }, [selectedDepartment, selectedStatus, showDelayedOnly]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-0">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-4 sm:px-6 lg:px-8 py-6"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Map View
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Interactive map of all municipal projects with real-time status updates
        </p>
      </motion.div>

      {/* Content */}
      <div className="relative h-[calc(100vh-120px)] overflow-hidden">
        {/* Control Panel */}
        <MapControlPanel
          departments={departments}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          showHeatmap={showHeatmap}
          onHeatmapToggle={setShowHeatmap}
          showDelayedOnly={showDelayedOnly}
          onDelayedOnlyToggle={setShowDelayedOnly}
          isCollapsed={isPanelCollapsed}
          onCollapseToggle={setIsPanelCollapsed}
        />

        {/* Map Container */}
        <div className="relative w-full h-full overflow-hidden">
          <InteractiveMap
            projects={filteredProjects}
            selectedProject={selectedProject}
            onProjectSelect={setSelectedProject}
            showDelayedOnly={showDelayedOnly}
          />

          {/* Real-time Updates Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-white dark:bg-slate-900 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg border border-gray-200 dark:border-slate-700"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-green-500"
            />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Live Updates
            </span>
          </motion.div>

          {/* No Results State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex items-center justify-center z-10"
            >
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-8 text-center max-w-sm shadow-xl">
                <AlertCircle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No projects found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters to see projects on the map
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedDepartment(null);
                    setSelectedStatus(null);
                    setShowDelayedOnly(false);
                    setSelectedProject(null);
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 px-4 sm:px-6 lg:px-8 py-3"
      >
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          <div className="space-x-4">
            <span>
              Showing{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredProjects.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {mockProjects.length}
              </span>{" "}
              projects
            </span>
          </div>
          <div className="hidden sm:flex gap-4">
            <div>
              <span className="text-gray-700 dark:text-gray-300">Delayed:</span>{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {mockProjects.filter((p) => p.status === "delayed").length}
              </span>
            </div>
            <div>
              <span className="text-gray-700 dark:text-gray-300">Active:</span>{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {mockProjects.filter((p) => p.status === "ongoing").length}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
