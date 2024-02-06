import classes from "./styles.module.css";
import { LangSwitcher } from "../LangSwitcher";
import Search from "../Search";

const Navbar = () => {
  return (
    <nav className={classes.Nav}>
      <Search placeholder="search-placeholder" />
      <LangSwitcher />
    </nav>
  );
};

export default Navbar;
