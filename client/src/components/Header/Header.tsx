import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import LoginContext from "../../context/LoginContext";
import Logout from "./Logout";

const Header = () => {
  const context = useContext(LoginContext);
  const storageUser = useMemo<string | null>(() => {
    if (localStorage.getItem("amigoSecretoToken")) {
      const { username } = JSON.parse(
        localStorage.getItem("amigoSecretoToken") as string
      );
      return username;
    }
    return null;
  }, []);

  return (
    <div className={styles["header"]}>
      <nav>
        <ul className={styles["nav-list"]}>
          {context?.isLogged &&
          (context?.roles?.includes(0) || context?.roles?.includes(1)) ? (
            <li>
              <Link to={`/dashboard/${storageUser}`}>Admin</Link>
            </li>
          ) : null}

          <li>
            <Link to="/">Cadastro</Link>
          </li>
          <li>
            {context?.isLogged ? <Logout /> : <Link to="/login">Login</Link>}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
