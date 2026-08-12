import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    restaurantId: number;
    restaurantName: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    decreaseQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    cartTotal: number;
    orderType: 'delivery' | 'pickup'; 
    setOrderType: (type: 'delivery' | 'pickup') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');

    const addToCart = (newItem: CartItem) => {
        setCartItems((prevItems) => {
            if (prevItems.length > 0 && prevItems[0].restaurantId !== newItem.restaurantId) {
                const confirmClear = window.confirm(
                    `Your cart contains items from "${prevItems[0].restaurantName}".\n\nDo you want to clear your cart and add items from "${newItem.restaurantName}" instead?`
                );
                
                if (confirmClear) {
                    return [{ ...newItem, quantity: 1 }];
                } else {
                    return prevItems; 
                }
            }

            const existingItem = prevItems.find(item => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...newItem, quantity: 1 }];
        });
    };

    const decreaseQuantity = (id: number) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === id);
            if (existingItem?.quantity === 1) {
                return prevItems.filter(item => item.id !== id);
            }
            return prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
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
        <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, cartTotal, orderType, setOrderType }}>
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