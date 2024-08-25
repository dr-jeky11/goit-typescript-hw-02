import { ReactElement } from "react";
import s from "./ErrorMessage.module.css";
import img from "../../Images/9170816.jpg";

export default function ErrorMessage(): ReactElement {
  return (
    <div className={s.container}>
      <img
        className={s.errorImage}
        src={img}
        alt="Oops, something went wrong. Please reload the page."
      />
      <p className={s.text}>
        Oops, something went wrong.{" "}
        <span className={s.smaller}>Please reload this page.</span>
      </p>
    </div>
  );
}
