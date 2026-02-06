import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { ProjectListView } from "@/components/projects/ProjectListView";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectDetailDrawer } from "@/components/projects/ProjectDetailDrawer";
import { mockProjects, Project } from "@/lib/mockData";

type ViewMode = "list" | "card";

export default function Projects() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const [budgetMin, setBudgetMin] = useState(0);
  const [budgetMax, setBudgetMax] = useState(10000000);
  const [selectedSort, setSelectedSort] = useState("budget-desc");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique departments and wards
  const departments = useMemo(
    () => [...new Set(mockProjects.map((p) => p.department))],
    []
  );

  const wards = useMemo(
    () => ["Downtown", "Midtown", "Uptown", "Suburbs", "Industrial"],
    []
  );

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = mockProjects.filter((project) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          project.name.toLowerCase().includes(query) ||
          project.department.toLowerCase().includes(query) ||
          project.location.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Department filter
      if (selectedDepartment && project.department !== selectedDepartment)
        return false;

      // Status filter
      if (selectedStatus) {
        const statusLower = selectedStatus.toLowerCase();
        if (
          project.status.toLowerCase() !==
          (statusLower === "active" ? "ongoing" : statusLower)
        )
          return false;
      }

      // Budget range filter
      if (project.budget < budgetMin || project.budget > budgetMax)
        return false;

      // Ward filter
      if (selectedWard && !project.location.includes(selectedWard))
        return false;

      return true;
    });

    // Sort projects
    switch (selectedSort) {
      case "budget-desc":
        result.sort((a, b) => b.budget - a.budget);
        break;
      case "budget-asc":
        result.sort((a, b) => a.budget - b.budget);
        break;
      case "progress-desc":
        result.sort((a, b) => b.progress - a.progress);
        break;
      case "updated":
        result.sort((a, b) =>
          new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
        );
        break;
    }

    return result;
  }, [
    searchQuery,
    selectedDepartment,
    selectedStatus,
    budgetMin,
    budgetMax,
    selectedWard,
    selectedSort,
  ]);

  // Animate filter changes with GSAP
  useEffect(() => {
    const filterContainer = document.querySelector("[data-filter-container]");
    if (filterContainer) {
      gsap.to(filterContainer, {
        opacity: 0.5,
        duration: 0.2,
        onComplete: () => {
          gsap.to(filterContainer, {
            opacity: 1,
            duration: 0.2,
          });
        },
      });
    }
  }, [
    selectedDepartment,
    selectedStatus,
    budgetMin,
    budgetMax,
    selectedWard,
  ]);

  const handleViewDetails = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  }, []);

  const handleViewModeChange = (mode: ViewMode) => {
    gsap.to("[data-projects-container]", {
      opacity: 0,
      duration: 0.15,
      onComplete: () => {
        setViewMode(mode);
        gsap.to("[data-projects-container]", {
          opacity: 1,
          duration: 0.15,
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage and track all municipal projects in one place
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        data-filter-container
        className="mb-8"
      >
        <ProjectFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          departments={departments}
          wards={wards}
          selectedDepartment={selectedDepartment}
          onDepartmentChange={setSelectedDepartment}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onBudgetRangeChange={(min, max) => {
            setBudgetMin(min);
            setBudgetMax(max);
          }}
          onWardChange={setSelectedWard}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
        />
      </motion.div>

      {/* View Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-6"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {filteredProjects.length}
          </span>{" "}
          project{filteredProjects.length !== 1 ? "s" : ""}
        </p>

        {/* View Toggle */}
        <div className="flex gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg p-1">
          <button
            onClick={() => handleViewModeChange("list")}
            className={`p-2 rounded transition-colors ${
              viewMode === "list"
                ? "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
            title="List View"
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleViewModeChange("card")}
            className={`p-2 rounded transition-colors ${
              viewMode === "card"
                ? "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
            title="Card View"
          >
            <Grid3x3 className="h-5 w-5" />
          </button>
        </div>
      </motion.div>

      {/* Projects Container */}
      <motion.div
        data-projects-container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700"
          >
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10a4 4 0 018 0m-4 4v4m0-11h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters or search query
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedDepartment(null);
                setSelectedStatus(null);
                setBudgetMin(0);
                setBudgetMax(10000000);
                setSelectedWard(null);
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : viewMode === "list" ? (
          <ProjectListView
            projects={filteredProjects}
            onViewDetails={handleViewDetails}
            isLoading={isLoading}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewDetails}
                index={index}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Detail Drawer */}
      <ProjectDetailDrawer
        project={selectedProject}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
