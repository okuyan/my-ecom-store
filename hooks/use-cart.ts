import { useState, createContext, useContext, useEffect } from "react";
import { initiateCheckout } from "../lib/payments";
import products from "../products.json";

interface IProduct {
  id: string;
  quantity: number;
}

type Cart = {
  products: {
    [id: string]: IProduct;
  };
};

type TCartContext = {
  addCart: ({ id }: { id: string }) => void;
  checkout: () => void;
  subtotal: number;
};

const defaultCart = {
  products: {},
} as Cart;

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  const cartItems =
    cart.products &&
    Object.keys(cart.products).map((key) => {
      // Find the product data in products.json
      const product = products.find(({ id }) => id === key);
      return {
        ...cart.products[key],
        pricePerItem: parseInt(product!.price),
      };
    });
  const subtotal = cartItems.reduce(
    (acc, cur) => acc + cur!.pricePerItem * cur!.quantity,
    0
  );

  const totalItems = cartItems.reduce((acc, cur) => acc + cur!.quantity, 0);

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => ({
        price: item.id,
        quantity: item.quantity,
      })),
    });
  }

  function addCart({ id } = { id: "" }) {
    updateCart((prev) => {
      let cart = { ...prev };

      if (cart.products[id]) {
        cart.products[id].quantity += 1;
      } else {
        cart.products[id] = {
          id,
          quantity: 1,
        };
      }
      return cart;
    });
  }

  return {
    addCart,
    subtotal,
    totalItems,
    checkout,
  };
}

//export const CartContext = createContext<TCartContext | undefined>(undefined);
export const CartContext = createContext<TCartContext | undefined>(undefined);

export function useCart() {
  const cart = useContext(CartContext);
  if (cart === undefined) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return cart;
}
