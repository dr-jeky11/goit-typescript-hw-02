import { ReactElement } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Loader(): ReactElement {
  const override = {
    display: "block",
    margin: "0 auto",
    marginTop: 20,
  };

  return (
    <PacmanLoader
      color={"greenyellow"}
      speedMultiplier={0.85}
      cssOverride={override}
    />
  );
}
