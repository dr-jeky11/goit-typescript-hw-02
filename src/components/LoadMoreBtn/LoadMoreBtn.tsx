import s from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onAddMore }) {
  return (
    <button className={s.btn} onClick={onAddMore}>
      Load more
    </button>
  );
}
