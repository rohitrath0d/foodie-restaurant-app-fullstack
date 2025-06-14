import { useState } from "react";
import { Button } from "../../components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { User, Settings, CreditCard, MapPin, Bell, LogOut } from "lucide-react";

const mockUser = {
  id: "1",
  name: "Jessica Chen",
  email: "jessica@example.com",
  avatar: "https://i.pravatar.cc/150?img=5",
  // role: "client" as const,
  phoneNumber: "+1 (555) 123-4567",
  address: "123 Main St, Apt 4B, New York, NY 10001"
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phoneNumber: mockUser.phoneNumber || "",
    address: mockUser.address || "",
    securityQuestion: "",
    securityAnswer: "",
  });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would save the user data
    console.log("Saving user data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 pt-8 pb-20">
      <div className="flex items-center mb-6">
        <div className="relative">
          <img 
            src={mockUser.avatar} 
            alt={mockUser.name} 
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow"
          />
          {isEditing && (
            <Button 
              variant="secondary"
              size="sm"
              className="absolute -right-2 -bottom-2 rounded-full h-8 w-8 p-0"
            >
              <Settings size={14} />
            </Button>
          )}
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{mockUser.name}</h1>
          <p className="text-gray-500">{mockUser.email}</p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account">
            <User size={16} className="mr-2" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="addresses">
            <MapPin size={16} className="mr-2" />
            <span className="hidden sm:inline">Addresses</span>
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard size={16} className="mr-2" />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell size={16} className="mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal details here
                  </CardDescription>
                </div>
                {!isEditing && (
                  <Button 
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              {isEditing && (
                <div className="mt-6 border-t pt-6 border-gray-100">
                  <h3 className="font-semibold mb-4">Security</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="securityQuestion">Security Question</Label>
                      <Input 
                        id="securityQuestion"
                        name="securityQuestion"
                        value={formData.securityQuestion}
                        onChange={handleInputChange}
                        placeholder="Example: What was your first pet's name?"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="securityAnswer">Answer</Label>
                      <Input 
                        id="securityAnswer"
                        name="securityAnswer"
                        type="password"
                        value={formData.securityAnswer}
                        onChange={handleInputChange}
                        placeholder="Your answer"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-restaurant-softRed hover:bg-restaurant-softRed/90"
                >
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                className="w-full sm:w-auto flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Addresses</CardTitle>
              <CardDescription>
                Manage your delivery locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Address content would go here */}
              <p className="text-center py-8 text-gray-500">
                This feature will be implemented soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment options
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Payment content would go here */}
              <p className="text-center py-8 text-gray-500">
                This feature will be implemented soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control which notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Notification content would go here */}
              <p className="text-center py-8 text-gray-500">
                This feature will be implemented soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;