// Modified Footer.jsx
import { Typography } from "@material-tailwind/react";
import Title from "./Title";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-white p-8 dark:bg-[#1e293b]">
      <div className="flex flex-col place-content-evenly items-center gap-4 min-[580px]:flex-row">
        <Title colorLight="text-black" colorDark="text-gray-50"></Title>
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-12 gap-y-6 text-center md:justify-between">
          <ul className="flex flex-col flex-wrap items-center gap-x-8 gap-y-4 min-[500px]:flex-row">
            <Link to="/about">
              <Typography
                color="blue-gray"
                className="font-normal hover:text-blue-700 focus:text-blue-500 active:text-blue-500 dark:text-gray-50 dark:hover:text-gray-300 dark:focus:text-gray-400 dark:active:text-gray-400"
              >
                {t("footer__aboutUs")}
              </Typography>
            </Link>
            <Link to="/license">
              <Typography
                color="blue-gray"
                className="font-normal hover:text-blue-700 focus:text-blue-500 active:text-blue-500 dark:text-gray-50 dark:hover:text-gray-300 dark:focus:text-gray-400 dark:active:text-gray-400"
              >
                {t("footer__license")}
              </Typography>
            </Link>
            <Link to="/forum">
              <Typography
                color="blue-gray"
                className="font-normal hover:text-blue-700 focus:text-blue-500 active:text-blue-500 dark:text-gray-50 dark:hover:text-gray-300 dark:focus:text-gray-400 dark:active:text-gray-400"
              >
                {t("footer__forum")}
              </Typography>
            </Link>
            <Link to="/support">
              <Typography
                color="blue-gray"
                className="font-normal hover:text-blue-700 focus:text-blue-500 active:text-blue-500 dark:text-gray-50 dark:hover:text-gray-300 dark:focus:text-gray-400 dark:active:text-gray-400"
              >
                {t("footer__contactUs")}
              </Typography>
            </Link>
          </ul>
        </div>
      </div>
      <hr className="my-8 border-blue-gray-50 dark:border-gray-50" />
      <Typography
        color="blue-gray"
        className="text-center font-normal dark:text-gray-50"
      >
        &copy; 2025 ParkSmart
      </Typography>
    </footer>
  );
}