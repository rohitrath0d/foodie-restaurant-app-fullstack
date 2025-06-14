
import { useRef } from "react";
// import { FoodCategory } from "@/types";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

// interface CategoryListProps {
//   categories: FoodCategory[];
//   selectedCategory: string | null;
//   onSelectCategory: (id: string | null) => void;
// }

export const CategoryList = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
// }: CategoryListProps) => {
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // const scroll = (direction: "left" | "right") => {
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 200;
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={16} />
        </Button>
      </div>
      
      <div 
        className="flex overflow-x-scroll py-3 px-1 scrollbar-none"
        ref={scrollContainerRef}
      >
        <Button
          key="all"
          onClick={() => onSelectCategory(null)}
          variant="ghost"
          className={cn(
            "whitespace-nowrap rounded-full mr-2 px-4 py-2 text-sm transition-all duration-200",
            selectedCategory === null 
              ? "bg-restaurant-softRed text-white hover:bg-restaurant-softRed/90"
              : "bg-white text-gray-700 hover:bg-gray-100"
          )}
        >
          All Categories
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            variant="ghost"
            className={cn(
              "whitespace-nowrap rounded-full mr-2 px-4 py-2 text-sm transition-all duration-200",
              selectedCategory === category.id
                ? "bg-restaurant-softRed text-white hover:bg-restaurant-softRed/90"
                : "bg-white text-gray-700 hover:bg-gray-100"
            )}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};
