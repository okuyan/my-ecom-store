import Head from "next/head";
import { FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Cart.module.css";

import Table from "../components/Table";
import { useCart } from "../hooks/use-cart";

import products from "../products.json";
import React from "react";

const columns = [
  {
    columnId: "title",
    Header: "Product Name",
  },
  {
    columnId: "quantity",
    Header: "Quantity",
  },
  {
    columnId: "pricePerItem",
    Header: "Price Per Item",
  },
  {
    columnId: "total",
    Header: "Item Total",
  },
];

export default function Cart() {
  const { checkout, cartItems, updateItem } = useCart();
  const data = cartItems.map((item) => {
    const product = products.find(({ id }) => id === item.id);

    const Quantity = () => {
      const handleSubmit = (e: React.BaseSyntheticEvent) => {
        e.preventDefault();
        const { currentTarget } = e;
        const inputs = Array.from(currentTarget.elements);
        const targetInput = inputs.find(
          (input) => (input as HTMLInputElement).name === "quantity"
        );
        const quantity = parseInt((targetInput as HTMLInputElement).value);

        updateItem({
          id: item.id,
          quantity,
        });
      };
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="quantity"
            min={0}
            defaultValue={item.quantity}
          />
          <button>Update</button>
        </form>
      );
    };

    return {
      ...item,
      quantity: <Quantity />,
      total: item.quantity * item.pricePerItem,
      title: product?.title,
    };
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button
            className={styles.button}
            onClick={() => {
              checkout();
            }}
          >
            Check Out
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
