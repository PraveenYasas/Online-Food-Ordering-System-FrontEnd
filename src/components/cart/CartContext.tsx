import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (newItem: CartItem) => {
        setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.id === newItem.id);
        if (existingItem) {
            // කලින් දාපු එකක් නම් quantity එක වැඩි කරනවා
            return prevItems.map(item =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }

        return [...prevItems, { ...newItem, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

const clearCart = () => {
    setCartItems([]);
};

const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}