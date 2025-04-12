import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthWrapper";
import ModeToggle from "./ModeToggle";
import { LangContext } from "../lang/LangWrapper";
import { useTranslation } from "react-i18next";
import Title from "./Title";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { setUser } = useContext(AuthContext);
  const { lang, setLang } = useContext(LangContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    setLang(lng);
    localStorage.setItem("language", lng); // Store selected language
  };

  return (
    <nav className="border-gray-200 bg-white px-4 py-2.5 lg:px-6 dark:bg-gray-800">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        <Title colorLight="text-black" colorDark="text-white"></Title>
        <div className="flex items-center lg:order-2">
          <ModeToggle className="mr-4 justify-self-end rounded-lg hover:text-gray-400 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:hover:bg-gray-700 dark:focus:ring-gray-800"></ModeToggle>
          {/* <Link
            to="/license"
            className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-400 focus:ring-4 focus:ring-gray-300 focus:outline-none active:text-[#777E8C] lg:px-5 lg:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            License
          </Link> */}
          {/*  */}

          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              {lang.toUpperCase()}
              <svg
                className="-mr-1 size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {isLanguageOpen && (
              <div
                className="absolute left-0 isolate z-10 mt-2 w-max origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                onBlur={() => setIsLanguageOpen(false)}
                tabIndex={0} // Ensures `onBlur` works properly
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      changeLanguage("en");
                      setIsLanguageOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage("zh");
                      setIsLanguageOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    中文 (Chinese)
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage("ms");
                      setIsLanguageOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Bahasa Melayu
                  </button>
                  <button
                    onClick={() => {
                      changeLanguage("hi");
                      setIsLanguageOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    हिन्दी (Hindi)
                  </button>
                </div>
              </div>
            )}
          </div>
          {/*  */}

          {user ? (
            <button
              className="mr-2 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-400 focus:ring-4 focus:ring-gray-300 focus:outline-none active:text-[#777E8C] lg:px-5 lg:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              onClick={async () => {
                try {
                  localStorage.removeItem("token");
                  setUser(null);
                  navigate("/login");

                  const serverUrl = process.env.SERVER_URL
                    ? process.env.SERVER_URL
                    : `http://localhost:${process.env.PORT}`;

                  const response = await fetch(`${serverUrl}/logout`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              {t("header__signOut")}
            </button>
          ) : (
            <Link
              to="/login"
              className="mr-2 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-400 focus:ring-4 focus:ring-gray-300 focus:outline-none active:text-[#777E8C] lg:px-5 lg:py-2.5 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              {t("header__login")}
            </Link>
          )}

          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:hidden dark:text-gray-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`h-6 w-6 ${isMenuOpen ? "hidden" : "block"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className={`h-6 w-6 ${isMenuOpen ? "block" : "hidden"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`w-full transform items-center justify-between overflow-hidden transition-all duration-300 ease-in-out lg:flex lg:w-auto ${
            isMenuOpen
              ? "max-h-screen scale-100"
              : "max-h-0 scale-95 lg:max-h-full lg:scale-100"
          }`}
          id="mobile-menu-2"
        >
          <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
            <li>
              <Link
                to="/home"
                className="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:text-gray-400 active:text-[#777E8C] lg:border-0 lg:p-0 lg:hover:bg-transparent dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
                aria-current="page"
              >
                {t("header__home")}
              </Link>
            </li>
            <li>
              <Link
                to="/searchpage"
                className="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:text-gray-400 active:text-[#777E8C] lg:border-0 lg:p-0 lg:hover:bg-transparent dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
              >
                {t("header__search")}
              </Link>
            </li>
            <li>
              <Link
                to="/forum"
                className="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:text-gray-400 active:text-[#777E8C] lg:border-0 lg:p-0 lg:hover:bg-transparent dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
              >
                {t("header__forum")}
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:text-gray-400 active:text-[#777E8C] lg:border-0 lg:p-0 lg:hover:bg-transparent dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
              >
                {t("header__support")}
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:text-gray-400 active:text-[#777E8C] lg:border-0 lg:p-0 lg:hover:bg-transparent dark:border-gray-700 dark:text-gray-50 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent lg:dark:hover:text-white"
              >
                {t("header__profile")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
