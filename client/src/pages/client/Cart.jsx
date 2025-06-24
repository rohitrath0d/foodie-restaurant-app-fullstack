
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Input } from "../../components/ui/input";
// import { CartItem } from "@/types";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

// Mock cart data
// const mockCartItems: CartItem[] = [
const mockCartItems = [
  {
    id: "cart1",
    foodItemId: "1",
    name: "Classic Cheeseburger",
    price: 9.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    specialInstructions: "No onions please",
  },
  {
    id: "cart2",
    foodItemId: "3",
    name: "California Roll",
    price: 12.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1583623025817-d180a2fe075e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
  },
];

const Cart = () => {
  // const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // const updateQuantity = (id: string, newQuantity: number) => {
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // const removeItem = (id: string) => {
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.trim() === "DISCOUNT20") {
      setPromoApplied(true);
    }
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoApplied ? subtotal * 0.2 : 0; // 20% discount if promo applied
  const total = subtotal + deliveryFee + tax - discount;

  return (
    <div className="container mx-auto max-w-3xl px-4 pt-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length > 0 ? (
        <>
          <div className="mb-6">
            {cartItems.map((item) => (
              <Card key={item.id} className="mb-4 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                      
                      {item.specialInstructions && (
                        <p className="text-xs text-gray-500 mt-1 italic">
                          "{item.specialInstructions}"
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <Button 
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="mx-2 w-6 text-center">{item.quantity}</span>
                          <Button 
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={14} className="animate-bounce-small" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 p-0 h-auto"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <Input 
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="mr-2"
                />
                <Button 
                  onClick={applyPromoCode}
                  disabled={promoApplied}
                >
                  Apply
                </Button>
              </div>
              
              {promoApplied && (
                <div className="bg-green-50 text-green-700 px-3 py-2 rounded-md text-sm">
                  20% discount applied successfully!
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-restaurant-softRed">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-restaurant-softRed hover:bg-restaurant-softRed/90 flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={16} />
              </Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-xl mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add items to your cart to continue</p>
          {/* <Link to="/"> */}
          <Link to="/home-page">
            <Button className="bg-restaurant-softRed hover:bg-restaurant-softRed/90">
              Browse Restaurants
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
