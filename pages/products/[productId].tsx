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
