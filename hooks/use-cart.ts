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

interface ICartItem {
  id: string;
  quantity: number;
  pricePerItem: number;
}

type TCartContext = {
  addCart: ({ id }: { id: string }) => void;
  checkout: () => void;
  updateItem: ({ id, quantity }: { id: string; quantity: number }) => void;
  subtotal: number;
  cartItems: ICartItem[];
};

const defaultCart = {
  products: {},
} as Cart;

export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);

  useEffect(() => {
    const cartFromStorage = window.localStorage.getItem("spacejelly_cart");
    const data = cartFromStorage && JSON.parse(cartFromStorage);
    if (data) {
      updateCart(data);
    }
  }, []); // ComponentDidMount()

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("spacejelly_cart", data);
  }, [cart]);

  const cartItems =
    cart.products &&
    Object.keys(cart.products).map((key) => {
      // Find the product data in products.json
      const product = products.find(({ id }) => id === key);
      return {
        ...cart.products[key],
        pricePerItem: product!.price,
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

  function updateItem({ id, quantity }: { id: string; quantity: number }) {
    updateCart((prev) => {
      let cart = { ...prev };
      if (cart.products[id]) {
        if (quantity > 0) {
          cart.products[id].quantity = quantity;
        } else {
          delete cart.products[id];
        }
      }
      return cart;
    });
  }

  return {
    cartItems,
    addCart,
    subtotal,
    totalItems,
    checkout,
    updateItem,
  };
}

export const CartContext = createContext<TCartContext | undefined>(undefined);

export function useCart() {
  const cart = useContext(CartContext);
  if (cart === undefined) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return cart;
}
