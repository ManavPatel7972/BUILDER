import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { MapPin, X } from "lucide-react";

interface InteractiveMapProps {
  projects: Project[];
  selectedProject: Project | null;
  onProjectSelect: (project: Project | null) => void;
  showDelayedOnly?: boolean;
}

interface MarkerPosition {
  x: number;
  y: number;
  color: string;
  status: string;
}

export const InteractiveMap = ({
  projects,
  selectedProject,
  onProjectSelect,
  showDelayedOnly = false,
}: InteractiveMapProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [recentlyUpdated, setRecentlyUpdated] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [projects]);

  // Filter projects based on delayed-only flag
  const visibleProjects = showDelayedOnly
    ? projects.filter((p) => p.status === "delayed")
    : projects;

  // Simulate live updates - mark some projects as recently updated
  useEffect(() => {
    const interval = setInterval(() => {
      const randomProject =
        projects[Math.floor(Math.random() * projects.length)];
      if (randomProject) {
        setRecentlyUpdated((prev) => {
          const updated = new Set(prev);
          updated.add(randomProject.id);
          return updated;
        });

        setTimeout(() => {
          setRecentlyUpdated((prev) => {
            const updated = new Set(prev);
            updated.delete(randomProject.id);
            return updated;
          });
        }, 3000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [projects]);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "completed":
        return "#10b981";
      case "ongoing":
        return "#eab308";
      case "delayed":
        return "#ef4444";
      case "planned":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm">
      {/* SVG Map Background */}
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full opacity-40"
        preserveAspectRatio="none"
      >
        {/* Grid */}
        <defs>
          <pattern
            id="grid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="1000" height="600" fill="url(#grid)" />

        {/* Road-like paths */}
        <line x1="100" y1="300" x2="900" y2="300" stroke="#9ca3af" strokeWidth="3" />
        <line x1="500" y1="50" x2="500" y2="550" stroke="#9ca3af" strokeWidth="3" />
        <line x1="100" y1="150" x2="900" y2="150" stroke="#9ca3af" strokeWidth="2" />
        <line x1="100" y1="450" x2="900" y2="450" stroke="#9ca3af" strokeWidth="2" />
      </svg>

      {/* Markers */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
          </div>
        ) : (
          <>
            {visibleProjects.map((project) => {
              // Normalize coordinates to SVG space
              const x =
                ((project.lng + 74.5) / (74.5 - 73.5)) * 900 + 50;
              const y =
                ((40.85 - project.lat) / (40.85 - 40.7)) * 500 + 50;

              const isSelected = selectedProject?.id === project.id;
              const isRecentlyUpdated = recentlyUpdated.has(project.id);

              return (
                <motion.button
                  key={project.id}
                  onClick={() => onProjectSelect(isSelected ? null : project)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: isSelected ? 1.3 : 1,
                    opacity: 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    left: `${(x / 1000) * 100}%`,
                    top: `${(y / 600) * 100}%`,
                  }}
                  title={project.name}
                >
                  {/* Pulse animation for recently updated */}
                  {isRecentlyUpdated && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: 2,
                      }}
                      className="absolute -inset-4 rounded-full border-2 border-primary"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}

                  {/* Marker circle */}
                  <motion.div
                    animate={{
                      scale: isSelected ? 1.2 : 1,
                      boxShadow: isSelected
                        ? "0 0 30px rgba(14, 165, 233, 0.8)"
                        : "0 2px 8px rgba(0, 0, 0, 0.15)",
                    }}
                    className="relative w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer transition-all"
                    style={{
                      backgroundColor: getStatusColor(project.status),
                    }}
                  >
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" />
                  </motion.div>

                  {/* Hover tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-2 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 z-40"
                    style={{ pointerEvents: "none" }}
                  >
                    {project.name}
                  </motion.div>
                </motion.button>
              );
            })}
          </>
        )}
      </div>

      {/* Selected Project Info Panel */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:w-80 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 shadow-xl p-4 z-30"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {selectedProject.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedProject.department}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onProjectSelect(null)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Budget:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ${(selectedProject.budget / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Progress:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedProject.progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${selectedProject.progress}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </div>
          </div>

          <Badge className={`w-full justify-center py-1 ${
            selectedProject.status === "completed"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : selectedProject.status === "ongoing"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : selectedProject.status === "delayed"
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}>
            {selectedProject.status}
          </Badge>
        </motion.div>
      )}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-4 right-4 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-4 shadow-lg hidden md:block"
      >
        <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">
          Status Legend
        </h4>
        <div className="space-y-2">
          {[
            { color: "#10b981", label: "Completed" },
            { color: "#eab308", label: "Active" },
            { color: "#ef4444", label: "Delayed" },
            { color: "#8b5cf6", label: "Planned" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
