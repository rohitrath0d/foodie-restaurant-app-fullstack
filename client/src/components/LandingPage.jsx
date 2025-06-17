/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Clock, 
  Star, 
  Utensils, 
  MapPin, 
  Shield, 
  Smartphone,
  Truck,
  ChefHat,
  Heart,
  Users,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-coral" />,
      title: "Lightning Fast Delivery",
      description: "Get your favorite meals delivered in 20-30 minutes",
      color: "from-coral to-coral-light"
    },
    {
      icon: <Shield className="w-8 h-8 text-navy" />,
      title: "Quality Guaranteed",
      description: "Fresh ingredients, hygienic preparation, satisfaction guaranteed",
      color: "from-navy to-navy-light"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-mustard" />,
      title: "Easy Ordering",
      description: "Order with just a few taps on your mobile device",
      color: "from-mustard to-mustard-light"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
    { number: "500+", label: "Restaurant Partners", icon: <ChefHat className="w-6 h-6" /> },
    { number: "50K+", label: "Orders Delivered", icon: <Truck className="w-6 h-6" /> },
    { number: "4.8★", label: "Average Rating", icon: <Star className="w-6 h-6" /> }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Browse & Choose",
      description: "Explore restaurants and dishes near you",
      icon: <Utensils className="w-12 h-12" />
    },
    {
      step: "02",
      title: "Order & Pay",
      description: "Place your order and pay securely online",
      icon: <Smartphone className="w-12 h-12" />
    },
    {
      step: "03",
      title: "Track & Enjoy",
      description: "Track your order and enjoy your meal",
      icon: <Truck className="w-12 h-12" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-mint-light via-background to-mint overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-20 left-10 w-32 h-32 bg-coral/10 rounded-full blur-xl"
            variants={floatVariants}
            animate="animate"
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-48 h-48 bg-mustard/10 rounded-full blur-xl"
            variants={floatVariants}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <motion.div 
            className="absolute top-1/2 right-10 w-24 h-24 bg-navy/10 rounded-full blur-xl"
            variants={floatVariants}
            animate="animate"
            transition={{ delay: 2 }}
          />
        </div>

        <motion.div 
          className="relative z-10 max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-6 bg-coral/20 text-coral border-coral/30 hover:bg-coral/30 transition-colors">
              <Zap className="w-3 h-3 mr-1" />
              New in your area!
            </Badge>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="text-navy">Delicious Food</span><br />
            <span className="bg-gradient-to-r from-coral via-coral-light to-mustard bg-clip-text text-transparent">
              Delivered Fast
            </span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-navy/70 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Experience the joy of having your favorite meals delivered to your doorstep. 
            From local gems to popular chains, we bring you the best food in town with lightning-fast delivery.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            variants={itemVariants}
          >
            <Button 
              asChild
              size="lg" 
              className="bg-coral hover:bg-coral/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/login">
                Start Ordering Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-navy/20 text-navy hover:bg-navy hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              <MapPin className="mr-2 w-5 h-5" />
              Find Restaurants
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-soft"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-center mb-2 text-coral">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-navy mb-1">{stat.number}</div>
                <div className="text-sm text-navy/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              Why Choose <span className="text-coral">Cozy Eats?</span>
            </h2>
            <p className="text-lg text-navy/70 max-w-2xl mx-auto">
              We're not just another food delivery app. We're your culinary companion, 
              bringing you closer to the flavors you love.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-navy mb-3">{feature.title}</h3>
                    <p className="text-navy/70 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-navy/5 to-coral/5">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">
              How It <span className="text-coral">Works</span>
            </h2>
            <p className="text-lg text-navy/70 max-w-2xl mx-auto">
              Getting your favorite food has never been easier. Just three simple steps and you're done!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection Lines for Desktop */}
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-coral via-mustard to-navy opacity-30"></div>
            
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-coral to-coral-light flex items-center justify-center text-white shadow-xl mb-4 relative z-10">
                    {step.icon}
                  </div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold z-20">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">{step.title}</h3>
                <p className="text-navy/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-coral via-coral-light to-mustard relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience <br />Amazing Food?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of food lovers who trust Cozy Eats for their daily cravings. 
            Your next favorite meal is just a tap away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-coral hover:bg-white/90 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/login">
                <Heart className="mr-2 w-5 h-5" />
                Start Your Food Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-navy text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-coral to-mustard bg-clip-text text-transparent">
            Cozy Eats
          </h3>
          <p className="text-white/70 mb-6">
            Bringing delicious food to your doorstep, one order at a time.
          </p>
          <div className="text-white/50 text-sm">
            © 2025 Cozy Eats. Made with ❤️ for food lovers everywhere.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
