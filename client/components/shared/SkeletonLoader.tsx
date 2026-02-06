import { motion } from "framer-motion";

interface SkeletonLoaderProps {
  variant: "card" | "row" | "chart" | "table";
  count?: number;
}

export const SkeletonLoader = ({
  variant,
  count = 3,
}: SkeletonLoaderProps) => {
  const baseClass =
    "bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse";

  if (variant === "card") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`${baseClass} h-64`}
            />
          ))}
      </div>
    );
  }

  if (variant === "row") {
    return (
      <div className="space-y-3">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`${baseClass} h-16`}
            />
          ))}
      </div>
    );
  }

  if (variant === "chart") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`${baseClass} h-80`}
      />
    );
  }

  if (variant === "table") {
    return (
      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${baseClass} h-12`}
        />
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`${baseClass} h-14`}
            />
          ))}
      </div>
    );
  }

  return null;
};
