import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

export function ThemeToggle() {
  // const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const storedTheme = localStorage.getItem("theme");
    // const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
    
    // If no preference, check system preference
    if (!initialTheme) {
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? "dark" 
        : "light";
      setTheme(systemPreference);
      document.documentElement.classList.toggle("dark", systemPreference === "dark");
      return;
    }
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Don't render until we know the theme to prevent flashing
  if (theme === null) return null;

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="rounded-full transition-all hover:bg-accent/20"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-mustard animate-scale-in" />
      ) : (
        <Moon className="h-5 w-5 text-mustard animate-scale-in" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}