export interface Project {
  id: string;
  name: string;
  department: string;
  budget: number;
  spent: number;
  status: "completed" | "ongoing" | "delayed" | "planned";
  progress: number;
  startDate: string;
  endDate: string;
  location: string;
  lat: number;
  lng: number;
}

export interface DepartmentData {
  name: string;
  budget: number;
  spent: number;
}

export interface MonthlySpending {
  month: string;
  amount: number;
}

export const mockProjects: Project[] = [
  {
    id: "proj_001",
    name: "Downtown Infrastructure Upgrade",
    department: "Transportation",
    budget: 2500000,
    spent: 1800000,
    status: "ongoing",
    progress: 72,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    location: "Downtown District",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: "proj_002",
    name: "Public Library Renovation",
    department: "Parks & Recreation",
    budget: 850000,
    spent: 850000,
    status: "completed",
    progress: 100,
    startDate: "2023-06-01",
    endDate: "2024-05-30",
    location: "Central Library",
    lat: 40.7535,
    lng: -73.9832,
  },
  {
    id: "proj_003",
    name: "Water Treatment Plant Expansion",
    department: "Utilities",
    budget: 5200000,
    spent: 2100000,
    status: "ongoing",
    progress: 40,
    startDate: "2024-02-01",
    endDate: "2025-12-31",
    location: "East Side Water Plant",
    lat: 40.7614,
    lng: -73.9776,
  },
  {
    id: "proj_004",
    name: "Community Health Center",
    department: "Health",
    budget: 1200000,
    spent: 1350000,
    status: "delayed",
    progress: 85,
    startDate: "2023-09-01",
    endDate: "2024-09-30",
    location: "Midtown Health Center",
    lat: 40.758,
    lng: -73.9855,
  },
  {
    id: "proj_005",
    name: "Green Park Development",
    department: "Parks & Recreation",
    budget: 450000,
    spent: 180000,
    status: "ongoing",
    progress: 40,
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    location: "Riverside Park",
    lat: 40.7505,
    lng: -73.9934,
  },
  {
    id: "proj_006",
    name: "School Technology Initiative",
    department: "Education",
    budget: 3200000,
    spent: 2400000,
    status: "ongoing",
    progress: 75,
    startDate: "2024-01-01",
    endDate: "2025-06-30",
    location: "District Schools",
    lat: 40.7489,
    lng: -73.9680,
  },
  {
    id: "proj_007",
    name: "Street Lighting Replacement",
    department: "Transportation",
    budget: 1800000,
    spent: 0,
    status: "planned",
    progress: 0,
    startDate: "2024-07-01",
    endDate: "2025-03-31",
    location: "City-wide",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: "proj_008",
    name: "Senior Center Expansion",
    department: "Social Services",
    budget: 750000,
    spent: 580000,
    status: "ongoing",
    progress: 77,
    startDate: "2024-02-15",
    endDate: "2024-11-30",
    location: "Central Senior Center",
    lat: 40.7549,
    lng: -73.9840,
  },
];

export const departmentBudgets: DepartmentData[] = [
  { name: "Transportation", budget: 4300000, spent: 1800000 },
  { name: "Parks & Recreation", budget: 1300000, spent: 1030000 },
  { name: "Utilities", budget: 5200000, spent: 2100000 },
  { name: "Health", budget: 1200000, spent: 1350000 },
  { name: "Education", budget: 8500000, spent: 6400000 },
  { name: "Social Services", budget: 1800000, spent: 910000 },
];

export const monthlySpending: MonthlySpending[] = [
  { month: "Jan", amount: 1200000 },
  { month: "Feb", amount: 1350000 },
  { month: "Mar", amount: 1100000 },
  { month: "Apr", amount: 1450000 },
  { month: "May", amount: 1300000 },
  { month: "Jun", amount: 1550000 },
  { month: "Jul", amount: 1400000 },
  { month: "Aug", amount: 1250000 },
];

export const getKPIData = () => {
  const totalBudget = departmentBudgets.reduce((sum, d) => sum + d.budget, 0);
  const totalSpent = departmentBudgets.reduce((sum, d) => sum + d.spent, 0);
  const completedProjects = mockProjects.filter(
    (p) => p.status === "completed"
  ).length;
  const activeProjects = mockProjects.filter(
    (p) => p.status === "ongoing" || p.status === "delayed"
  ).length;

  return {
    totalBudget,
    totalSpent,
    remaining: totalBudget - totalSpent,
    percentageSpent: (totalSpent / totalBudget) * 100,
    completedProjects,
    activeProjects,
    totalProjects: mockProjects.length,
  };
};

export const getStatusColor = (
  status: "completed" | "ongoing" | "delayed" | "planned"
) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "ongoing":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "delayed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "planned":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  }
};
