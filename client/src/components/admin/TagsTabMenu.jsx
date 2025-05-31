import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
// import { FoodTag } from "@/types";
import PropTypes from "prop-types";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useTagStore } from "../../store/useTagStore"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ColorPicker } from "../ui/color-picker";
import { Toaster, toast } from "../ui/sonner";



// interface TagsTabProps {
//   tags: FoodTag[];
// }

// const TagsTab = ({ tags }) => {               // i am destructuring tags from props (({ tags })), but i am not actually passing tags as a prop. i'm using Zustand (useTagStore) to manage and fetch the tag data instead.
const TagsTabMenu = () => {

  const { tags, getAllTags, createTag, updateTag, deleteTag, isLoading, error } = useTagStore()         // hence i am not passing tags as a prop, but rather fetching them from the Zustand store using useTagStore hook.
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTag, setCurrentTag] = useState({
    id: "",
    name: "",
    color: "#000000",
  });



  useEffect(() => {
    getAllTags();
  }, [getAllTags]);



  const handleAddClick = () => {
    setIsEditMode(false);
    setCurrentTag({
      id: "",
      name: "",
      color: "#" + Math.floor(Math.random() * 16777215).toString(16), // Random color
    });
    setIsDialogOpen(true);
  };

  const handleEditClick = (tag) => {
    setIsEditMode(true);
    setCurrentTag(tag);
    setIsDialogOpen(true);
  };


  const handleDeleteClick = async (tagId) => {
    try {
      await deleteTag(tagId);
      toast({
        title: "Success",
        description: "Tag deleted successfully",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateTag(currentTag.id, {
          name: currentTag.name,
          color: currentTag.color,
        });
        // await updateTag(currentTag.id, currentTag); 
        toast({
          title: "Success",
          description: "Tag updated successfully",
          variant: "default",
        });
      } else {
        // await createTag({
        //   name: currentTag.name,
        //   color: currentTag.color,
        // });                                    //  --> this is double-nesting the payload data. You're wrapping the object twice → createTag({ name: currentTag }) . Just pass the object directly → createTag(currentTag)
        await createTag(currentTag);
        // await createTag(currentTag.name, currentTag.color);
        toast({
          title: "Success",
          description: "Tag created successfully",
          variant: "default",
        });
      }
      setIsDialogOpen(false);
    } catch (err) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTag((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (color) => {
    setCurrentTag((prev) => ({
      ...prev,
      color,
    }));
  };



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Food Tags</h2>
        <Button onClick={handleAddClick}>
          <Plus size={16} className="mr-1" />
          Add Tag
        </Button>
      </div>

      {isLoading && <div>Loading tags...</div>}
      {error && <div className="text-red-500">{error}</div>}


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
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={() => handleEditClick(tag)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteClick(tag.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Tag Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Tag" : "Add New Tag"}</DialogTitle>

            <DialogDescription>
              {isEditMode
                ? "Make changes to the tag below and click update."
                : "Fill in the tag details and click add to create a new tag."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Tag Name</Label>
              <Input
                id="name"
                name="name"
                value={currentTag.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Tag Color</Label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: currentTag.color }}
                ></div>
                <ColorPicker
                  color={currentTag.color}
                  onChange={handleColorChange}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Update Tag" : "Add Tag"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// You're not passing tags as props anymore, you’re reading from store.
// ✅ So either remove propTypes entirely:
// Or if you want to keep it reusable, switch to:
// If you switch back to props later:
// TagsTabMenu.propTypes = {
// tags: PropTypes.array,
// };
// TagsTabMenu.propTypes = {
//   tags: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       color: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };


export default TagsTabMenu;