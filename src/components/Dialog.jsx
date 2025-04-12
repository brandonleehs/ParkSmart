import { useTranslation } from "react-i18next";
import MuiDialog from "@mui/material/Dialog";

export default function Dialog({
  open,
  setOpen,
  record,
  availabilityLimit = 0.5,
}) {
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MuiDialog
        onClose={handleClose}
        open={open}
        closeAfterTransition={false}
        className="relative"
      >
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-1 right-1 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-gray-500 focus:outline-none focus:ring-inset dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {(() => {
          if (record) {
            return (
              <div
                data-address={record.address}
                className="flex w-full max-w-[350px] flex-col gap-3 rounded-md border-1 border-gray-200 p-6 shadow-md md:w-[350px] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                <div className="grid w-full justify-items-center gap-2">
                  <p className="font-medium">{record.title}</p>
                  {(() => {
                    if (record.lotsAvailable && record.totalLots) {
                      if (
                        record.lotsAvailable / record.totalLots >=
                        availabilityLimit
                      ) {
                        return (
                          <p className="rounded-xl bg-green-200 px-2.5 py-1 text-sm text-green-600 dark:bg-green-900 dark:text-green-300">
                            {t("search__available")}
                          </p>
                        );
                      }
                      if (record.lotsAvailable > 0) {
                        return (
                          <p className="rounded-xl bg-amber-200 px-2.5 py-1 text-sm text-amber-600 dark:bg-amber-900 dark:text-amber-300">
                            {t("search__limited")}
                          </p>
                        );
                      }
                      if (record.lotsAvailable === 0) {
                        return (
                          <p className="rounded-xl bg-red-200 px-2.5 py-1 text-sm text-red-600 dark:bg-red-900 dark:text-red-300">
                            {t("search__full")}
                          </p>
                        );
                      }
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
                      <p className="text-sm">{toTitleCase(record.address)}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {Math.round((record.distance / 1000) * 10) / 10}
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
                    className={`text-sm ${!record.lotsAvailable || !record.totalLots ? "text-red-600 dark:text-red-400" : ""}`}
                  >
                    {record.lotsAvailable !== undefined &&
                    record.totalLots != undefined ? (
                      <>
                        <span
                          className={
                            record.lotsAvailable / record.totalLots >=
                            availabilityLimit
                              ? "text-green-600 dark:text-green-400"
                              : record.lotsAvailable > 0
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-red-600 dark:text-red-400"
                          }
                        >
                          {record.lotsAvailable}
                        </span>{" "}
                        / <span className="font-bold">{record.totalLots}</span>{" "}
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

                  <p className="text-sm">
                    {t("search__shortTermParking")}
                    {toTitleCase(record.short_term_parking)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-moon-fill dark:fill-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                  </svg>
                  <p className="text-sm">
                    {t("search__nightParking")}:{" "}
                    {toTitleCase(record.night_parking)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-buildings-fill dark:fill-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z" />
                  </svg>
                  <p className="text-sm">{toTitleCase(record.car_park_type)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrows-vertical dark:fill-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.354 14.854a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 13.293V2.707L6.354 3.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 2.707v10.586l1.146-1.147a.5.5 0 0 1 .708.708z" />
                  </svg>
                  <p className="text-sm">
                    {t("search__heightLimit")}: {record.gantry_height}m
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
                  <p className="text-sm">
                    {toTitleCase(record.type_of_parking_system)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-cash-coin dark:fill-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
                    />
                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                  </svg>
                  <p className="text-sm">
                    {t("search__freeParking")}:{" "}
                    {toTitleCase(record.free_parking)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-layers-fill dark:fill-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882z" />
                    <path d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0z" />
                  </svg>
                  <p className="text-sm">
                    {t("search__carparkDecks")}: {record.car_park_decks}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#9ca3af"
                    className="bi bi-option dark:fill-gray-400"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.5a.5.5 0 0 1 .5-.5h3.797a.5.5 0 0 1 .439.26L11 13h3.5a.5.5 0 0 1 0 1h-3.797a.5.5 0 0 1-.439-.26L5 3H1.5a.5.5 0 0 1-.5-.5zm10 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                  </svg>
                  <p className="text-sm">
                    {t("search__basement")}:{" "}
                    {record.car_park_basement === "Y" ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            );
          }
        })()}
      </MuiDialog>
    </>
  );
}

function toTitleCase(text) {
  return text.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}
