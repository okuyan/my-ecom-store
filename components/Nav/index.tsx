import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/use-cart";

import styles from "./Nav.module.css";

const Nav = () => {
  const { subtotal, checkout } = useCart();

  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>Space Jelly Shop</p>
      <p className={styles.navCart}>
        <button>
          <FaShoppingCart onClick={checkout} /> ${subtotal.toFixed(2)}
        </button>
      </p>
    </nav>
  );
};

export default Nav;
