import { useState, useEffect } from 'react';

// Type definition for Food
type Food = {
  foodId: number;
  menuId: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

const useCart = () => {
  // Initialize cart from localStorage or start with an empty array
  const [cart, setCart] = useState<Food[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item: Food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.foodId === item.foodId);

      if (existingItem) {
        // If the item exists, update its quantity
        return prevCart.map((cartItem) =>
          cartItem.foodId === item.foodId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeItem = (foodId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.foodId !== foodId));
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  return { cart, addItem, removeItem, clearCart };
};

export default useCart;
