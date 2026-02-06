import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Layout } from "@/components/layout/Layout";
import Login from "./pages/Login";
import CitizenDashboard from "./pages/CitizenDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Projects from "./pages/Projects";
import MapView from "./pages/MapView";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

// Protected route wrapper
function ProtectedRoute({
  children,
  requiredRoles,
  pageTitle,
}: {
  children: React.ReactNode;
  requiredRoles: string[];
  pageTitle: string;
}) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (!requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <Layout pageTitle={pageTitle}>
      <div className="pt-4">{children}</div>
    </Layout>
  );
}

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {!isAuthenticated && <Route path="/" element={<Login />} />}

        {/* Protected Routes - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              requiredRoles={["citizen", "officer", "admin"]}
              pageTitle="Dashboard"
            >
              <CitizenDashboard />
            </ProtectedRoute>
          }
        />

        {/* Officer Dashboard */}
        <Route
          path="/officer-dashboard"
          element={
            <ProtectedRoute
              requiredRoles={["officer", "admin"]}
              pageTitle="Department Dashboard"
            >
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              requiredRoles={["admin"]}
              pageTitle="Admin Dashboard"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Projects */}
        <Route
          path="/projects"
          element={
            <ProtectedRoute
              requiredRoles={["citizen", "officer", "admin"]}
              pageTitle="Projects"
            >
              <Projects />
            </ProtectedRoute>
          }
        />

        {/* Map View */}
        <Route
          path="/map"
          element={
            <ProtectedRoute
              requiredRoles={["citizen", "officer", "admin"]}
              pageTitle="Map View"
            >
              <MapView />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute
              requiredRoles={["citizen", "officer", "admin"]}
              pageTitle="Reports"
            >
              <Placeholder
                title="Reports"
                description="Generate and view comprehensive budget and spending reports with customizable filters."
              />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              requiredRoles={["admin"]}
              pageTitle="User Management"
            >
              <Placeholder
                title="User Management"
                description="Manage user accounts, roles, and permissions across the system."
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute
              requiredRoles={["admin"]}
              pageTitle="Department Management"
            >
              <Placeholder
                title="Department Management"
                description="Configure departments, assign budgets, and manage departmental settings."
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/budget"
          element={
            <ProtectedRoute
              requiredRoles={["admin"]}
              pageTitle="Budget Allocation"
            >
              <Placeholder
                title="Budget Allocation"
                description="Allocate and manage budget distribution across departments and projects."
              />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              requiredRoles={["citizen", "officer", "admin"]}
              pageTitle="Profile"
            >
              <Placeholder
                title="Profile Settings"
                description="Update your profile information and preferences."
              />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Error Routes */}
        <Route
          path="/unauthorized"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  403
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  You don't have permission to access this page
                </p>
              </div>
            </div>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
