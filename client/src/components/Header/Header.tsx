import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles["header"]}>
      <nav>
        <ul className={styles["nav-list"]}>
          <li>
            <Link to="/">Cadastro</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
