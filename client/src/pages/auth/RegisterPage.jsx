/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useAuthStore } from "../../store/useAuthStore";
import useAuthStore from "../../store/useAuthStore"
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Toaster, toast } from "../../components/ui/sonner";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../components/ui/form";




function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      answer: ''
    }
  });

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (data) => {
    try {
      // 🔍 Problem: Mismatch in field names
      // We're sending:     data.name,      // ❌ This will be passed as first argument, NOT as an object
      // But in your useAuthStore:    userName,     // ✅ expects userName
      // Fix: Pass an object
      const userId = await register({
        // data.name,
        // data.email,
        // data.password,
        // data.phone,
        // data.address,
        // data.answer

        userName: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        address: data.address,
        answer: data.answer,
      });

      if (userId) {
        toast.success(
          // title: "Registration Successful!",
          "Register Successful!", {
          description: "You can now log in!",
          duration: 3000,
        });
        navigate('/login');
      }
    } catch (error) {
      toast.error(
        // title: 'Registration Failed',
        "Registration Failed", {
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint to-mint/30 dark:from-navy-light/20 dark:to-navy/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // className="w-full max-w-md"
        className="w-full max-w-xl"    // 36rem (~576px)
      // className="w-full sm:max-w-xl md:max-w-2xl"
      >
        <Card className="border-0 shadow-lg backdrop-blur-xl bg-white/70 dark:bg-navy/70">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mx-auto mb-4"
            >
              <h2 className="text-3xl font-bold bg-coral-gradient text-transparent bg-clip-text">
                FOODIE
              </h2>
            </motion.div>
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Form {...form}>
              {/* <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4"> */}
              <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Name Field */}
                <FormField
                  control={form.control}
                  // name="name"
                  name="userName"
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    // In each <FormItem>, add: className="w-full"
                    <FormItem className="w-full">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          className="bg-white/50 dark:bg-navy/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="bg-white/50 dark:bg-navy/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="bg-white/50 dark:bg-navy/50"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number (10 digits required)"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          className="bg-white/50 dark:bg-navy/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address Field */}
                <FormField
                  control={form.control}
                  name="address"
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          className="bg-white/50 dark:bg-navy/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Security Answer Field */}
                <FormField
                  control={form.control}
                  name="answer"
                  rules={{ required: "Security answer is required" }}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Security Question Answer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your answer"
                          className="bg-white/50 dark:bg-navy/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  // className="w-full bg-black text-white hover:bg-black transition-colors"
                  // className="w-full col-span-1 md:col-span-2 bg-black text-white hover:bg-black transition-colors"
                  className="w-full col-span-1 md:col-span-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : (
                    <>
                      CREATE ACCOUNT
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-gray-500 font-bold">
              Already have an account?{" "}
              {/* <Link to="/api/v1/auth/login" className="text-black hover:underline font-bold"> */}
              {/* <Link to="/login" className="text-black hover:underline font-bold"> */}
              <Link to="/login" className="text-coral hover:underline font-bold">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default RegisterPage;