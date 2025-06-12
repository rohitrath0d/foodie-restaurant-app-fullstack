/* eslint-disable no-unused-vars */
import React, { useState } from "react"
// import { useAuthStore } from "../../store/useAuthStore"
import useAuthStore from "../../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { Label } from "../../components/ui/label"
import { Button } from "../../components/ui/button"
import { Toaster, toast } from "../../components/ui/sonner"
import { Input } from "../../components/ui/input"
import { motion } from "framer-motion"
import { LogIn } from "lucide-react"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { useForm } from "react-hook-form";



function LoginPage() {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // })


  const [showPassword, setShowPassword] = useState(false);
  const { login, user, isLoading } = useAuthStore();

  const navigate = useNavigate();
  const form = useForm(
    {
      defaultValues: {
        email: '',
        password: '',
      }
    }
  );

  // const handleOnChange = (event) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [event.target.name]: event.target.value
  //   }))
  // }

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (data) => {
    // event.preventDefault()

    try {
      const success = await login(data.email, data.password)
      if (success) {
        toast({
          title: "Login Successful!",
          description: 'Welcome back!',
          duration: 3000
        })

        const user = useAuthStore.getState().user
        console.log('User object:', user); // Check the actual structure

        // if (user?.role === 'admin' || user?.role === 'superadmin') {
        if (user?.usertype === 'admin' || user?.usertype === 'superadmin') {
          navigate('/admin')
        } else {
          navigate('/home-page')
        }
      }

    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        variant: 'destructive'
      })
    }
  }

  return (
    //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint to-mint/30 dark:from-navy-light/20 dark:to-navy/30 p-4">
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.5 }}
    //       className="w-full max-w-md"
    //     >
    //       <div className="border-0 shadow-lg backdrop-blur-xl bg-white/70 dark:bg-navy/70 rounded-xl p-6 space-y-6">
    //         <motion.div
    //           initial={{ scale: 0.8 }}
    //           animate={{ scale: 1 }}
    //           transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
    //           className="text-center"
    //         >
    //           <h2 className="t ext-3xl font-bold bg-coral-gradient text-transparent bg-clip-text">Cozy Eats</h2>
    //           <h3 className="text-2xl font-bold mt-2">Welcome back</h3>
    //           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Enter your email and password to access your account</p>
    //         </motion.div>

    //         <form className="space-y-4" onSubmit={handleSubmit}>
    //           <div className="space-y-1">
    //             <Label htmlFor="email">Email</Label>
    //             <Input
    //               id="email"
    //               name="email"
    //               type="text"
    //               placeholder="example@email.com"
    //               className="bg-white/50 dark:bg-navy/50"
    //               required
    //               value={formData.email}
    //               onChange={handleOnChange}
    //             />
    //           </div>

    //           <div className="space-y-1">
    //             <Label htmlFor="password">Password</Label>
    //             <Input
    //               id="password"
    //               name="password"
    //               type="password"
    //               placeholder="••••••••"
    //               className="bg-white/50 dark:bg-navy/50"
    //               required
    //               value={formData.password}
    //               onChange={handleOnChange}
    //             />
    //           </div>

    //           <Button
    //             type="submit"
    //             className="w-full"
    //             disabled={isLoading}
    //           >
    //             {isLoading ? (
    //               <span className="flex items-center gap-2">
    //                 <span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></span>
    //                 Logging in...
    //               </span>
    //             ) : (
    //               <span className="flex items-center gap-2">
    //                 <LogIn size={18} /> Sign In
    //               </span>
    //             )}
    //           </Button>

    //           <div className="text-center text-sm text-gray-500">
    //             Don&apos;t have an account?{" "}
    //             <Link to="/auth/register" className="text-coral hover:underline font-semibold">
    //               Sign up
    //             </Link>
    //           </div>
    //         </form>
    //       </div>
    //     </motion.div>
    //   </div>
    // )


    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mint to-mint/30 dark:from-navy-light/20 dark:to-navy/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-lg backdrop-blur-xl bg-white/70 dark:bg-navy/70">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="mx-auto mb-4"
            >
              <h2 className="text-3xl font-bold bg-coral-gradient text-transparent bg-clip-text text-[FF6B6B]">
                FOODIE
              </h2>
            </motion.div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@email.com"
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
                  rules={{ required: "Password is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
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

                <Button type="submit" className="w-full bg-black text-white hover:bg-black transition-colors" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></span>
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn size={18} /> Sign In
                    </span>
                  )}
                </Button>

                <FormDescription className="text-center">
                  <span>Demo credentials:</span>
                  <span>Admin: admin@example.com / password</span>
                  <span>Client: user@example.com / password</span>
                </FormDescription>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/api/v1/auth/register" className="text-coral hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>

  )
}

export default LoginPage
