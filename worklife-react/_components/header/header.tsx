import { Feather } from "lucide-react";
import style from "./header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logoWrapper}>
        <Feather />
        <h2 className={style.title}>Art Box</h2>
      </div>
    </header>
  );
};

export default Header;
