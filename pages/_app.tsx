import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import { CartContext, useCartState } from "../hooks/use-cart";

function MyApp({ Component, pageProps }: AppProps) {
  const cart = useCartState();

  return (
    <CartContext.Provider value={cart}>
      <Nav />
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
export default MyApp;
