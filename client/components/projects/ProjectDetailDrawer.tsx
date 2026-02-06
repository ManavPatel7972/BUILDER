import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Calendar,
  DollarSign,
  BarChart3,
  Clock,
  MessageSquare,
  Edit2,
  Check,
  AlertCircle,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project, getStatusColor } from "@/lib/mockData";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency, formatDate } from "@/lib/formatters";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProjectDetailDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "overview" | "budget" | "timeline" | "logs";

const COLORS = ["#0ea5e9", "#06b6d4", "#10b981", "#f59e0b"];

export const ProjectDetailDrawer = ({
  project,
  isOpen,
  onClose,
}: ProjectDetailDrawerProps) => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isEditing, setIsEditing] = useState(false);

  if (!project) return null;

  const spentPercent = (project.spent / project.budget) * 100;
  const budgetBreakdown = [
    { name: "Personnel", value: project.budget * 0.4 },
    { name: "Materials", value: project.budget * 0.35 },
    { name: "Equipment", value: project.budget * 0.15 },
    { name: "Contingency", value: project.budget * 0.1 },
  ];

  const monthlySpend = [
    { month: "Jan", amount: project.spent * 0.1 },
    { month: "Feb", amount: project.spent * 0.12 },
    { month: "Mar", amount: project.spent * 0.15 },
    { month: "Apr", amount: project.spent * 0.18 },
    { month: "May", amount: project.spent * 0.25 },
    { month: "Jun", amount: project.spent * 0.2 },
  ];

  const tabs = [
    { id: "overview" as TabType, label: "Overview" },
    { id: "budget" as TabType, label: "Budget" },
    { id: "timeline" as TabType, label: "Timeline" },
    { id: "logs" as TabType, label: "Updates" },
  ];

  const canEdit = user?.role === "officer" || user?.role === "admin";
  const canDelete = user?.role === "admin";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full lg:w-96 bg-white dark:bg-slate-900 shadow-xl z-50 overflow-y-auto border-l border-gray-200 dark:border-slate-700"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                    {project.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {project.department}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex gap-2">
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                {project.status === "delayed" && (
                  <Badge variant="outline" className="text-red-600">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Requires Attention
                  </Badge>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-6 pt-6 border-b border-gray-200 dark:border-slate-700 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Key Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Total Budget
                      </p>
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        {formatCurrency(project.budget)}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Spent
                      </p>
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        {formatCurrency(project.spent)}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Remaining
                      </p>
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        {formatCurrency(project.budget - project.spent)}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        Completion
                      </p>
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        {project.progress}%
                      </p>
                    </div>
                  </div>

                  {/* Location & Dates */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Location
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {project.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Timeline
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatDate(project.startDate)} →{" "}
                          {formatDate(project.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Officer Actions */}
                  {canEdit && (
                    <div className="border-t border-gray-200 dark:border-slate-700 pt-4 space-y-2">
                      <Button className="w-full" onClick={() => setIsEditing(true)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Project
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                      {canDelete && (
                        <Button variant="destructive" className="w-full">
                          Delete Project
                        </Button>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Budget Tab */}
              {activeTab === "budget" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Budget Allocation
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={budgetBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {budgetBreakdown.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatCurrency(value as number)}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="mt-4 space-y-2">
                      {budgetBreakdown.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="h-3 w-3 rounded-full"
                              style={{
                                backgroundColor: COLORS[i % COLORS.length],
                              }}
                            />
                            <span className="text-gray-600 dark:text-gray-400">
                              {item.name}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(item.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Timeline Tab */}
              {activeTab === "timeline" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Monthly Spending
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={monthlySpend}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#374151"
                        />
                        <XAxis stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          formatter={(value) =>
                            formatCurrency(value as number)
                          }
                        />
                        <Bar
                          dataKey="amount"
                          fill="#0ea5e9"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Milestones
                    </h4>
                    <div className="space-y-3">
                      {[
                        { date: "Jan 2024", label: "Project Kickoff" },
                        { date: "Mar 2024", label: "Phase 1 Complete" },
                        { date: "Jun 2024", label: "Phase 2 Underway" },
                        { date: "Dec 2024", label: "Projected Completion" },
                      ].map((milestone, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="h-3 w-3 rounded-full bg-primary"
                            />
                            {i < 3 && (
                              <div className="h-6 w-0.5 bg-gray-200 dark:bg-slate-700" />
                            )}
                          </div>
                          <div className="pb-4">
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {milestone.date}
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {milestone.label}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Logs Tab */}
              {activeTab === "logs" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {[
                    {
                      date: "Today",
                      user: "Jane Officer",
                      action: "Updated progress to 72%",
                    },
                    {
                      date: "2 days ago",
                      user: "Admin User",
                      action: "Changed status from Planned to Active",
                    },
                    {
                      date: "1 week ago",
                      user: "Jane Officer",
                      action: "Added budget note: Contingency reserve updated",
                    },
                  ].map((log, i) => (
                    <div
                      key={i}
                      className="border-l-2 border-primary pl-4 py-2"
                    >
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {log.date}
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-medium">{log.user}</span> {log.action}
                      </p>
                    </div>
                  ))}

                  {canEdit && (
                    <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-4">
                      <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Add a Note
                      </label>
                      <textarea
                        placeholder="Add updates or remarks about this project..."
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={3}
                      />
                      <Button className="mt-2 w-full" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Post Update
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
