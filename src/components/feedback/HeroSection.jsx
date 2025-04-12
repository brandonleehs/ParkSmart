import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  return (
    <section className="grid gap-5 bg-blue-100 px-4 py-12 text-center dark:bg-[#1e293b]">
      <p className="text-2xl font-bold text-gray-800 dark:text-white">
        {t("feedback__howCanWeHelpYou")}
      </p>
      {/* <form
        className="mx-auto w-full max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {t("feedback__searchButton")}
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-200 dark:border-gray-600 dark:bg-[#273244] dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder={t("feedback__searchArticles")}
            required
            disabled
          />
          <button
            type="submit"
            disabled
            className="absolute end-2.5 bottom-2.5 cursor-not-allowed rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white disabled:bg-gray-500 dark:bg-blue-600"
          >
            {t("feedback__searchButton")}
          </button>
        </div>
      </form> */}
    </section>
  );
};

export default HeroSection;
