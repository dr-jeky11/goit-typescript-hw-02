import toast, { Toaster } from "react-hot-toast";

import { RiSearchLine } from "react-icons/ri";
import { RiStarFill } from "react-icons/ri";

import s from "./SearchBar.module.css";

const notify = () =>
  toast.error("Please enter your query.", {
    duration: 2000,
    style: {
      border: "1px solid #713200",
      padding: "16px",
      color: "#713200",
    },
    iconTheme: {
      primary: "#713200",
      secondary: "#FFFAEE",
    },
  });

export default function SearchBar({ onSearch, onShowFav }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.search.value.trim();

    if (inputValue === "") {
      notify();
      return;
    }

    onSearch(inputValue);

    e.target.reset();
  };

  const handleShowFav = () => {
    onShowFav();
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <a href="./index.html" className={s.logo}>
          <span className={s.colorLogo}>Ga11ery</span>
        </a>
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.formContainer}>
            <input
              className={s.search}
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search..."
            />
            <button type="submit" className={s.btn}>
              <RiSearchLine size={22} color="lightslategray" />
            </button>
          </div>
        </form>
        <button type="button" className={s.favBtn} onClick={handleShowFav}>
          <RiStarFill size={28} color="lightslategray" />
          Favorites
        </button>
      </div>
    </header>
  );
}
