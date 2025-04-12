import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider, Switch } from "@mui/material";

export default function Filters({
  freeParking,
  setFreeParking,
  availFilter,
  setAvailFilter,
  heightRestriction,
  setHeightRestriction,
  nightParking,
  setNightParking,
}) {
  const { t } = useTranslation();

  const toggleAvailFilter = (type) => {
    setAvailFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="w-72 rounded-xl bg-white p-4 text-gray-700 shadow-md dark:border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
      <div className="mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#2563eb"
          className="bi bi-funnel-fill"
          viewBox="0 0 16 16"
        >
          <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
        </svg>
        <span className="font-bold text-blue-600 dark:text-blue-400">
          {t("search__filters")}
        </span>
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("search__freeParking")}
        </label>
        <div className="flex items-center">
          <Switch
            checked={freeParking}
            onChange={(e) => {
              setFreeParking(e.target.checked);
            }}
          ></Switch>
          <p className={"text-sm " + `${freeParking ? "font-semibold" : ""}`}>
            {t("search__onlyFreeParking")}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-1 text-gray-600 dark:text-gray-300">
        <label className="block text-sm font-medium">
          {t("search__nightParking")}
        </label>
        <div className="flex flex-col">
          <div
            onClick={() => {
              setNightParking("any");
            }}
            className={`cursor-pointer rounded-md p-2 text-sm text-gray-700 hover:bg-gray-200 active:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:active:bg-gray-600 ${nightParking === "any" ? "bg-gray-100 font-semibold dark:bg-gray-700" : ""}`}
          >
            {t("search__any")}
          </div>
          <div
            onClick={() => {
              setNightParking("yes");
            }}
            className={`cursor-pointer rounded-md p-2 text-sm text-gray-700 hover:bg-gray-200 active:bg-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:active:bg-gray-600 ${nightParking === "yes" ? "bg-gray-100 font-semibold dark:bg-gray-700" : ""}`}
          >
            {t("search__available")}
          </div>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-1">
        <label className="block text-sm font-medium">
          {t("search__availability")}
        </label>
        <div className="mt-1 space-y-2">
          {Object.keys(availFilter).map((type) => (
            <div key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={availFilter[type]}
                onChange={() => toggleAvailFilter(type)}
                className="form-checkbox cursor-pointer text-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize dark:text-gray-300">
                {type === "available"
                  ? t("search__available")
                  : type === "limited"
                    ? t("search__limited")
                    : t("search__full")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="block text-sm font-medium">
          {t("search__heightRestriction")}
        </label>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {t("search__selectMinHeight")}
        </p>
        <Slider
          className=""
          aria-label="heightRestriction"
          defaultValue={0}
          aria-valuetext={`At least ${heightRestriction}m`}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={9}
          onChange={(e) => {
            setHeightRestriction(e.target.value);
          }}
          id={"slider"}
        ></Slider>
      </div>
    </div>
  );
}
