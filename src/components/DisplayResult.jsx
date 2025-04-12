import { useTranslation } from "react-i18next";

export default function DisplayResult({
  title,
  address,
  distance,
  totalLots,
  lotsAvailable,
  gantryHeight,
  paymentType,
  operatingHours,
  freeParking,
  availabilityLimit = 0.5,
  viewResult,
}) {
  const { t } = useTranslation();

  return (
    <div
      data-address={address}
      className="flex w-full max-w-[350px] flex-col rounded-md border-1 border-gray-200 p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
    >
      <div className="grid justify-items-start gap-2 pb-3">
        <div className="grid w-full justify-items-center gap-2">
          <p className="font-medium text-black dark:text-gray-200">{title}</p>
          {(() => {
            if (lotsAvailable && totalLots) {
              lotsAvailable = parseInt(lotsAvailable);
              totalLots = parseInt(totalLots);
            }
            if (lotsAvailable / totalLots >= availabilityLimit) {
              return (
                <p className="rounded-xl bg-green-200 px-2.5 py-1 text-sm text-green-600 dark:bg-green-900 dark:text-green-300">
                  {t("search__available")}
                </p>
              );
            }
            if (lotsAvailable > 0) {
              return (
                <p className="rounded-xl bg-amber-200 px-2.5 py-1 text-sm text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                  {t("search__limited")}
                </p>
              );
            }
            if (lotsAvailable === 0) {
              return (
                <p className="rounded-xl bg-red-200 px-2.5 py-1 text-sm text-red-600 dark:bg-red-900 dark:text-red-300">
                  {t("search__full")}
                </p>
              );
            }
            return (
              <p className="rounded-xl bg-red-200 px-2.5 py-1 text-sm text-red-600 dark:bg-red-900 dark:text-red-300">
                {t("search__error")}
              </p>
            );
          })()}
        </div>
        <div className="">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#9ca3af"
              className="bi bi-geo-alt-fill dark:fill-gray-400"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
            </svg>

            <div className="grid justify-items-start">
              <p className="text-sm text-black dark:text-gray-200">{address}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {Math.round((distance / 1000) * 10) / 10}
                {t("search__distanceAway")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#9ca3af"
            className="bi bi-p-circle-fill dark:fill-gray-400"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
          </svg>
          <p
            className={`text-sm text-black dark:text-gray-200 ${!lotsAvailable || !totalLots ? "text-red-600 dark:text-red-400" : ""}`}
          >
            {lotsAvailable !== undefined && totalLots != undefined ? (
              <>
                <span
                  className={
                    lotsAvailable / totalLots >= availabilityLimit
                      ? "text-green-600 dark:text-green-400"
                      : lotsAvailable > 0
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-red-600 dark:text-red-400"
                  }
                >
                  {lotsAvailable}
                </span>{" "}
                / <span className="font-bold">{totalLots}</span>
                {t("search__spotsAvailable")}
              </>
            ) : (
              "Unable to retrieve lot information"
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#9ca3af"
            className="bi bi-clock-fill dark:fill-gray-400"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
          </svg>

          <p className="text-sm text-black dark:text-gray-200">
            {operatingHours}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrows-vertical text-black dark:text-gray-200"
            viewBox="0 0 16 16"
          >
            <path d="M8.354 14.854a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 13.293V2.707L6.354 3.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 2.707v10.586l1.146-1.147a.5.5 0 0 1 .708.708z" />
          </svg>
          <p className="text-sm text-black dark:text-gray-200">
            {t("search__heightLimit")}: {gantryHeight}
            {t("metres")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#9ca3af"
            className="bi bi-credit-card dark:fill-gray-400"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
          <p className="text-sm text-black dark:text-gray-200">{paymentType}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center border-t-1 border-t-gray-200 pt-2 dark:border-t-gray-700">
        <div className="flex flex-col">
          <p className="text-start text-sm text-gray-600 dark:text-gray-400">
            {t("search__freeParking")}
          </p>
          <p
            className={`text-start text-lg font-bold ${
              freeParking === "NO"
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {freeParking === "NO" ? t("search__no") : t("search__yes")}
          </p>
        </div>
        <button
          type="button"
          onClick={viewResult}
          className="end-2.5 bottom-2.5 ms-auto max-h-[2.5rem] cursor-pointer rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t("search__viewDetailsButton")}
        </button>
      </div>
    </div>
  );
}
