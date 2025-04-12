import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Title({
  colorLight = "text-black",
  colorDark = "text-white",
}) {
  return (
    <Link
      to="/home"
      className={`${colorLight} ${`dark:${colorDark}`} justify-self-start text-xl font-bold tracking-wide`}
    >
      <Logo></Logo>
      arkSmart
    </Link>
  );
}
