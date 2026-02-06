import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedBackground } from "@/components/auth/AnimatedBackground";
import { useAuthStore, type UserRole } from "@/store/authStore";

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("citizen@example.com");
  const [password, setPassword] = useState("password123");
  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await login(email, password, selectedRole);
      navigate("/dashboard");
    } catch (err) {
      // Error is handled by the store
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-md mx-auto"
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl shadow-lg mb-4">
              <span className="text-2xl font-bold text-white">MB</span>
            </div>
            <h1 className="text-3xl font-bold text-white mt-4">
              Budget Dashboard
            </h1>
            <p className="text-gray-300 mt-2">
              Municipal Budget Transparency & Analytics
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex gap-3 items-start"
                >
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300">{error}</p>
                </motion.div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 focus:border-cyan-400"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/50 focus:bg-white/30 focus:border-cyan-400"
                />
              </div>

              {/* Role Selector */}
              <div className="space-y-2">
                <Label className="text-white">Select Role (Demo)</Label>
                <div className="grid grid-cols-3 gap-3">
                  {(["citizen", "officer", "admin"] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      disabled={isLoading}
                      className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                        selectedRole === role
                          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/50"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Button */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </motion.div>

              {/* Demo Info */}
              <div className="text-center text-sm text-gray-300 space-y-1 pt-4 border-t border-white/10">
                <p>Demo Credentials:</p>
                <p>Email: any email (e.g., citizen@example.com)</p>
                <p>Password: any password (e.g., password123)</p>
              </div>
            </form>
          </motion.div>

          {/* Footer Text */}
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-400 text-xs mt-8"
          >
            © 2024 Municipal Budget Dashboard. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
