/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
// import { useToast } from "../../hooks/use-toast";
import { Toaster, toast } from "../../components/ui/sonner"
import { LogOut } from "lucide-react";
// import { useAuthStore } from "../../store/useAuthStore";
import useAuthStore from "../../store/useAuthStore";


const LogoutFallback = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  // const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [logout, navigate]);

  const circleVariants = {
    initial: { scale: 0 },
    animate: { scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const iconVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { delay: 0.3, duration: 0.5 } },
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-mint to-mint/30 dark:from-navy-light/20 dark:to-navy/30">
      <div className="max-w-md w-full text-center px-4">
        <motion.div className="flex flex-col items-center">
          <motion.div
            className="w-24 h-24 rounded-full bg-coral flex items-center justify-center mb-6"
            variants={circleVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={iconVariants} initial="initial" animate="animate">
              <LogOut size={40} className="text-white" />
            </motion.div>
          </motion.div>
          <motion.h1
            className="text-3xl font-bold mb-2 text-navy dark:text-mint"
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            Logging Out
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-300 mb-6"
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            Thank you for using Cozy Eats. See you soon!
          </motion.p>

          <motion.div
            className="w-full max-w-xs bg-white/20 dark:bg-navy/20 rounded-full h-2 overflow-hidden"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
          >
            <motion.div
              className="h-full bg-coral"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LogoutFallback;
