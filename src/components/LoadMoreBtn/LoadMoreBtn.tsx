import { ReactElement } from "react";
import s from "./LoadMoreBtn.module.css";

interface Props {
  onAddMore: () => void;
}

export default function LoadMoreBtn({ onAddMore }: Props): ReactElement {
  return (
    <button className={s.btn} onClick={onAddMore}>
      Load more
    </button>
  );
}
