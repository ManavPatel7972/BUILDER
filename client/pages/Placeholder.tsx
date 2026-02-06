import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 p-8 text-center">
          <Zap className="h-16 w-16 mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Continue prompting in the chat to request this page be built out.
          </p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </motion.div>
    </div>
  );
}
