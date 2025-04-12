import Header from "../components/Header.jsx";
import { AuthContext } from "../auth/AuthWrapper.jsx";
import { useState, useContext, useEffect, useRef, useReducer } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import SearchResult from "../components/SearchResult.jsx";
import DisplayResult from "../components/DisplayResult.jsx";
import { getDistance } from "geolib";
import { Slider } from "@mui/material";
import Filters from "../components/Filters.jsx";
import Footer from "../components/Footer.jsx";
import Dialog from "../components/Dialog.jsx";
import { useTranslation } from "react-i18next";
import SearchPageController from "../controllers/SearchPageController.js";

export default function SearchPage() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [records, setRecords] = useState([]);
  const [avail, setAvail] = useState([]);
  const { user } = useContext(AuthContext);
  const firstAvailCall = useRef(true);
  const firstLoad = useRef(true);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const mapUrl =
    "https://www.onemap.gov.sg/minimap/minimap.html?mapStyle=Default&zoomLevel=15";
  const mapSrc = lat && lng ? `${mapUrl}&latLng=${lat},${lng}` : mapUrl;
  const availabilityLimit = 0.5;
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState(null);

  const [freeParking, setFreeParking] = useState(false);
  const [nightParking, setNightParking] = useState("any");
  const [availFilter, setAvailFilter] = useState({
    available: true,
    limited: true,
    full: true,
  });
  const [heightRestriction, setHeightRestriction] = useState(0);

  const { t } = useTranslation();

  const searchPageController = new SearchPageController();
  const filter = searchPageController.filter;

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const authToken = process.env.ONEMAP_API_KEY;

    const timeoutId = setTimeout(() => {
      searchPageController.fetchQuery(query, authToken, setSearchResults);
    }, 500); // 500ms debounce delay, API rate limit is 260/min

    return () => clearTimeout(timeoutId); // Cleanup previous timeout
  }, [query]);

  if (firstLoad.current) {
    firstLoad.current = false;
    navigator.geolocation.getCurrentPosition((position) => {
      if (document.querySelectorAll("[data-address]").length === 0) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        searchPageController.firstLoadFetch(
          position.coords.latitude,
          position.coords.longitude,
          { setRecords, setAvail, forceUpdate },
        );
      }
    });
  }

  useEffect(() => {
    if (firstAvailCall.current) {
      firstAvailCall.current = false;
      searchPageController.fetchCarparkAvailability({
        records,
        record,
        avail,
        setRecords,
        setRecord,
        setAvail,
      });
      return;
    }
    const timeoutId = setTimeout(() => {
      if (records.length === 0) {
        return;
      }
      searchPageController.fetchCarparkAvailability({
        records,
        record,
        avail,
        setRecords,
        setRecord,
        setAvail,
      });
    }, 60000); // 60s debounce delay, API rate limit is 1000/hour

    return () => clearTimeout(timeoutId); // Cleanup previous timeout
  }, [firstLoad, records]);

  function handleClick(e) {
    e.stopPropagation();
    const longitude = e.currentTarget.getAttribute("data-longitude");
    const latitude = e.currentTarget.getAttribute("data-latitude");
    const x = e.currentTarget.getAttribute("data-x");
    const y = e.currentTarget.getAttribute("data-y");
    setLat(latitude);
    setLng(longitude);
    setQuery("");

    searchPageController.fetchRecords(latitude, longitude, {
      records,
      setRecords,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Header></Header>
      <main className="grid gap-5 p-4 dark:bg-gray-800 dark:text-white">
        <section className="flex flex-col items-center justify-evenly gap-4 rounded-lg bg-blue-50 p-4 min-[400px]:flex-row dark:bg-gray-700">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md min-w-[250px]"
          >
            <label htmlFor="search-input" className="sr-only">
              Search
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
                id="search-input"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder={t("search__searchLocation")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="absolute end-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {t("search__search")}
              </button>
            </div>
            <section
              id="search-results"
              className="absolute top-20 z-20 overflow-hidden rounded-lg border-1 border-[#dee2e6] bg-white shadow-md empty:border-0 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              {searchResults.slice(0, 5).map((result) => (
                <SearchResult
                  key={result.ADDRESS}
                  title={result.SEARCHVAL}
                  address={result.ADDRESS}
                  lat={result.LATITUDE}
                  lng={result.LONGITUDE}
                  x={result.X}
                  y={result.Y}
                  handleClick={handleClick}
                />
              ))}
            </section>
          </form>
        </section>
        <div className="flex flex-col items-center gap-5 lg:flex-row">
          <div className="flex justify-center">
            <Filters
              availFilter={availFilter}
              setAvailFilter={setAvailFilter}
              freeParking={freeParking}
              nightParking={nightParking}
              setNightParking={setNightParking}
              setFreeParking={setFreeParking}
              heightRestriction={heightRestriction}
              setHeightRestriction={setHeightRestriction}
            ></Filters>
          </div>
          <div className="relative overflow-hidden rounded-md shadow-md">
            {/* Very light transparent overlay */}
            <div
              className="pointer-events-none absolute inset-0 z-10 hidden mix-blend-multiply dark:block"
              style={{ backgroundColor: "rgba(30, 41, 59, 0.35)" }}
            ></div>

            <iframe
              src={mapSrc}
              width="1000px"
              height="1000px"
              scrolling="no"
              frameBorder="0"
              allowFullScreen="allowfullscreen"
              className="h-[250px] w-[70vw] justify-self-center rounded-md lg:h-[500px]"
            ></iframe>
          </div>
        </div>
        <section className="grid gap-4 border-t-1 border-gray-200 p-4 dark:border-gray-700">
          <div className="flex flex-col justify-items-center gap-4 md:flex-row md:items-center">
            <p className="text-center text-xl font-semibold text-black dark:text-gray-200">
              {t("search__availableParkingLots")}
            </p>
            <div className="flex flex-col items-center text-black md:ms-auto dark:text-gray-200">
              <label htmlFor="slider">
                {t("search__show")}
                <span className="font-bold">{limit}</span>
                {t("search__carparksWord")}
              </label>
              <Slider
                className="max-w-[256px]"
                aria-label="carparkAmount"
                defaultValue={10}
                aria-valuetext={`${limit} Carparks Showing`}
                valueLabelDisplay="auto"
                shiftStep={10}
                step={5}
                min={5}
                max={100}
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
                id={"slider"}
              ></Slider>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] justify-items-center gap-4">
            {filter(records, {
              freeParking,
              availFilter,
              nightParking,
              heightRestriction,
              avail,
              availabilityLimit,
            })
              .slice(0, limit)
              .map((record) => (
                <DisplayResult
                  key={record.car_park_no}
                  viewResult={(e) => {
                    const address =
                      e.target.parentNode.parentNode.getAttribute(
                        "data-address",
                      );
                    const newRecords = records.map((rec) => {
                      const carpark = avail.find(
                        (el) => el.carpark_number === rec.car_park_no,
                      );
                      if (carpark) {
                        rec.totalLots = carpark.carpark_info[0].total_lots;
                        rec.lotsAvailable =
                          carpark.carpark_info[0].lots_available;
                      }
                      if (rec.address === record.address) {
                        setRecord(rec);
                      }
                      return rec;
                    });
                    setRecords(newRecords);
                    setRecord(
                      newRecords.find((record) => record.address === address),
                    );
                    setOpen(true);
                  }}
                  distance={getDistance(
                    { latitude: lat, longitude: lng },
                    { latitude: record.latitude, longitude: record.longitude },
                  )}
                  title={record.title}
                  address={record.address}
                  // IIFE for conditional rendering
                  operatingHours={(() => {
                    if (record.short_term_parking === "WHOLE DAY") {
                      return "24 hours";
                    }
                    if (record.short_term_parking === "NO") {
                      return "Seasonal Parking";
                    }
                    return record.short_term_parking;
                  })()}
                  gantryHeight={record.gantry_height}
                  paymentType={toTitleCase(record.type_of_parking_system)}
                  totalLots={(() => {
                    const carpark = avail.find(
                      (el) => el.carpark_number === record.car_park_no,
                    );
                    return carpark
                      ? carpark.carpark_info[0].total_lots
                      : carpark;
                  })()}
                  lotsAvailable={(() => {
                    const carpark = avail.find(
                      (el) => el.carpark_number === record.car_park_no,
                    );
                    return carpark
                      ? carpark.carpark_info[0].lots_available
                      : carpark;
                  })()}
                  freeParking={record.free_parking}
                ></DisplayResult>
              ))}
          </div>
        </section>
      </main>
      <section className="grid items-center justify-items-center gap-6 bg-gray-100 p-6 min-[900px]:grid-cols-3 dark:bg-gray-700 dark:text-white [&>.card]:h-[200px] [&>.card]:w-[min(100%,350px)]">
        <div className="card grid gap-2 rounded-md border-1 border-gray-200 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2563eb"
              className="bi bi-car-front-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z" />
            </svg>
            <p className="text-lg font-bold text-black dark:text-gray-200">
              {t("search__whyChooseUs")}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("search__findCarparksNear")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("search__viewCarparkTypes")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("search__checkRealTime")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("search__getNightParkingInfo")}
          </p>
        </div>
        <div className="card grid gap-2 rounded-md border-1 border-gray-200 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2563eb"
              className="bi bi-info-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
            </svg>
            <p className="text-lg font-bold text-black dark:text-gray-200">
              {t("search__howItWorks")}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("search__searchForDesired")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("search__choosePreferred")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("search__viewRealTime")}
          </p>
        </div>
        <div className="card grid flex-row gap-2 rounded-md border-1 border-gray-200 bg-white p-4 shadow-md dark:border-gray-600 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2563eb"
              className="bi bi-telephone-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
              />
            </svg>
            <p className="text-lg font-bold text-black dark:text-gray-200">
              {t("search__needHelp")}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("search__haveQuestion")}
          </p>
          <button
            onClick={() => {
              navigate("/support");
            }}
            type="button"
            className="me-2 mb-2 cursor-pointer rounded-lg border border-blue-700 px-5 py-2.5 text-center text-sm font-medium text-blue-700 transition hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 focus:outline-none dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
          >
            {t("search__contactSupport")}
          </button>
        </div>
      </section>
      <Dialog open={open} setOpen={setOpen} record={record}></Dialog>
      <Footer></Footer>
    </>
  );
}

function toTitleCase(text) {
  return text.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
  );
}
