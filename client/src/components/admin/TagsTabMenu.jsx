import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { FoodTag } from "@/types";
import PropTypes from "prop-types";
import { Plus, Edit, Trash2 } from "lucide-react";

// interface TagsTabProps {
//   tags: FoodTag[];
// }

const TagsTab = ({ tags }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Food Tags</h2>
        <Button>
          <Plus size={16} className="mr-1" />
          Add Tag
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tags.map((tag) => (
          <Card key={tag.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: tag.color }}
                  ></div>
                  <h3 className="font-semibold">{tag.name}</h3>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};


TagsTab.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export default TagsTab;