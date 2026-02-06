import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProjectFiltersProps {
  onSearchChange: (query: string) => void;
  onDepartmentChange: (dept: string | null) => void;
  onStatusChange: (status: string | null) => void;
  onBudgetRangeChange: (min: number, max: number) => void;
  onWardChange: (ward: string | null) => void;
  onSortChange: (sort: string) => void;
  departments: string[];
  wards: string[];
  searchQuery: string;
  selectedDepartment: string | null;
  selectedStatus: string | null;
  selectedSort: string;
}

const statuses = ["Planned", "Active", "Delayed", "Completed"];
const sortOptions = [
  { label: "Budget (High → Low)", value: "budget-desc" },
  { label: "Budget (Low → High)", value: "budget-asc" },
  { label: "Completion %", value: "progress-desc" },
  { label: "Last Updated", value: "updated" },
];

export const ProjectFilters = ({
  onSearchChange,
  onDepartmentChange,
  onStatusChange,
  onBudgetRangeChange,
  onWardChange,
  onSortChange,
  departments,
  wards,
  searchQuery,
  selectedDepartment,
  selectedStatus,
  selectedSort,
}: ProjectFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [budgetMin, setBudgetMin] = useState(0);
  const [budgetMax, setBudgetMax] = useState(10000000);

  const handleBudgetChange = useCallback(
    (min: number, max: number) => {
      setBudgetMin(min);
      setBudgetMax(max);
      onBudgetRangeChange(min, max);
    },
    [onBudgetRangeChange]
  );

  const activeFilterCount = [
    selectedDepartment,
    selectedStatus,
    budgetMin > 0 || budgetMax < 10000000,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search projects, departments, wards..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700"
        />
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {/* Sort Dropdown */}
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Filter Toggle */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Filter className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Expandable Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg p-6 space-y-6">
              {/* Department Filter */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Department
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedDepartment === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => onDepartmentChange(null)}
                  >
                    All
                  </Button>
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      variant={selectedDepartment === dept ? "default" : "outline"}
                      size="sm"
                      onClick={() => onDepartmentChange(dept)}
                    >
                      {dept}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Status
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedStatus === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => onStatusChange(null)}
                  >
                    All
                  </Button>
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => onStatusChange(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Budget Range Slider */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Budget Range
                </h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={budgetMin}
                    onChange={(e) =>
                      handleBudgetChange(
                        parseInt(e.target.value),
                        budgetMax
                      )
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="100000"
                    value={budgetMax}
                    onChange={(e) =>
                      handleBudgetChange(budgetMin, parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>${(budgetMin / 1000000).toFixed(1)}M</span>
                    <span>${(budgetMax / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>

              {/* Ward Filter */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Ward / Zone
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={null === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => onWardChange(null)}
                  >
                    All
                  </Button>
                  {wards.map((ward) => (
                    <Button
                      key={ward}
                      variant="outline"
                      size="sm"
                      onClick={() => onWardChange(ward)}
                    >
                      {ward}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear All */}
              <div className="pt-2 border-t border-gray-200 dark:border-slate-700">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onDepartmentChange(null);
                    onStatusChange(null);
                    onBudgetRangeChange(0, 10000000);
                    onWardChange(null);
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
