import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-restaurant-beige">
      <div className="text-center p-6 max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-restaurant-softRed animate-bounce-small">404</h1>
        <img 
          src="https://images.unsplash.com/photo-1594761051009-b43fad29ff6e?auto=format&fit=crop&w=800&q=80" 
          alt="Food Not Found" 
          className="w-32 h-32 mx-auto rounded-full object-cover mb-6"
        />
        <h2 className="text-2xl font-semibold mb-2">Oops! Page not found</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find the page you're looking for. The recipe might be missing some ingredients!
        </p>
        <Link to="/">
          <Button className="bg-restaurant-softRed hover:bg-restaurant-softRed/90 flex items-center mx-auto">
            <Home size={16} className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
