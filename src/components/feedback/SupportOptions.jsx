import React from "react";
import { useTranslation } from "react-i18next";

const SupportOptions = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto my-12 flex max-w-6xl flex-col justify-center gap-8 px-4 md:flex-row">
      <div className="rounded-lg bg-white p-8 text-center shadow-md dark:bg-[#1e293b]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-[#273244]">
          <span className="text-2xl text-blue-600 dark:text-blue-400">?</span>
        </div>
        <h2 className="mb-4 text-xl font-semibold text-blue-800 dark:text-white">{t("feedback__fAQs")}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t("feedback__findQuickAnswers")}</p>
      </div>

      <div className="rounded-lg bg-white p-8 text-center shadow-md dark:bg-[#1e293b]">
        <a
          href="mailto:support@carparkgroup2.com?subject=CarPark Support Request&body=Hello Support Team,%0A%0AI need assistance with:%0A%0A"
          className="block text-inherit no-underline"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-[#273244]">
            <span className="text-2xl text-blue-600 dark:text-blue-400">✉</span>
          </div>
          <h2 className="mb-4 text-xl font-semibold text-blue-800 dark:text-white">{t("feedback__emailSupport")}</h2>
          <p className="text-gray-600 dark:text-gray-300">{t("feedback__getInTouch")}</p>
        </a>
      </div>

      <div className="rounded-lg bg-white p-8 text-center shadow-md dark:bg-[#1e293b]">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-[#273244]">
          <span className="text-2xl text-blue-600 dark:text-blue-400">☎</span>
        </div>
        <h2 className="mb-4 text-xl font-semibold text-blue-800 dark:text-white">{t("feedback__phoneSupport")}</h2>
        <p className="text-gray-600 dark:text-gray-300">{t("feedback__speakDirectly")}</p>
      </div>
    </section>
  );
};

export default SupportOptions;
