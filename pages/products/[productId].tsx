import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import styles from "../../styles/Product.module.css";
import products from "../../products.json";
import { useCart } from "../../hooks/use-cart";

type Props = {
  product: {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
  };
};

export default function Product({ product }: Props) {
  const { addCart } = useCart();
  const { id, title, description, image, price } = product;

  {
    /**
     * @lesson-13-todo Exercise 5
     * In other parts of our app, we used a custom hook
     * to import global data. How can we use that to
     * import a function to add items to our cart?
     */
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title} - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.productImage}>
          <img src={image} alt={title} />
        </div>

        <div>
          <h1>{title}</h1>

          <p className={styles.description}>{description}</p>

          <p className={styles.description}>${price.toFixed(2)}</p>

          {/**
           * @lesson-13-todo Exercise 5
           * Once we have our add to cart function, how can
           * we add an item to our customer's cart any time
           * they click the Buy button?
           */}
          <p>
            <button
              className={styles.button}
              onClick={() => {
                addCart({ id });
              }}
            >
              Buy
            </button>
          </p>
        </div>
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

{
  /**
   * @lesson-13-todo Exercise 4
   * Just defining page paths doesn't give us the data for
   * each page, we need a way to look up our product data
   * and pass it to the page. What API can we use to define
   * our page's props?
   */
}

{
  /**
   * @lesson-13-todo Exercise 3
   * Once we have a dynamic route, we need to tell Next.js
   * what paths are actually available to visit. What API
   * can we use to define our static paths?
   */
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = products.find(({ id }) => id === params!.productId);
  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = products.map((product) => {
    return {
      params: {
        productId: product.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
