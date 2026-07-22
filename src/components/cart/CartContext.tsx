import { createContext, useContext, useState, type ReactNode } from 'react';

// Cart එක ඇතුළට යන කෑම වල විස්තර
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

    // අලුත් කෑමක් Cart එකට දාන මෙතඩ් එක
    const addToCart = (newItem: CartItem) => {
        setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.id === newItem.id);
        if (existingItem) {
            // කලින් දාපු එකක් නම් quantity එක වැඩි කරනවා
            return prevItems.map(item =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        // අලුත් එකක් නම් කෙලින්ම දානවා
        return [...prevItems, { ...newItem, quantity: 1 }];
        });
    };

    // Cart එකෙන් අයින් කරන මෙතඩ් එක
    const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

// මුළු Cart එකම හිස් කරන මෙතඩ් එක (Checkout කරාම ඕනේ වෙනවා)
const clearCart = () => {
    setCartItems([]);
};

// Total එක හදන විදිය
const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// ලේසියෙන් අනිත් Components වලට Cart එක ගන්න පුළුවන් වෙන්න Custom Hook එකක්
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}