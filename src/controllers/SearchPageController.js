import { getDistance } from "geolib";
import RecordRepository from "../repositories/RecordRepository";

export default class SearchPageController {
  constructor() {}

  fetchRecords = (latitude, longitude, { records, setRecords }) => {
    fetch(
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_23f946fa557947f93a8043bbef41dd09&limit=5000",
      {
        method: "GET",
      },
    )
      .then((response) => response.json())
      .then((data) => {
        let records = data.result.records;
        records = records.map((record) => {
          record.x_coord = parseFloat(record.x_coord);
          record.y_coord = parseFloat(record.y_coord);
          const wgsCoord = SVYtoWGS(record.x_coord, record.y_coord);
          const lat = wgsCoord.latitude;
          const lon = wgsCoord.longitude;
          record.latitude = lat;
          record.longitude = lon;
          record.distance = getDistance(
            { latitude, longitude },
            { latitude: lat, longitude: lon },
          );
          const title = record.address
            .split(" ")
            .filter(
              (word) =>
                word !== "BLK" &&
                !(word.charAt(0) >= "0" && word.charAt(0) <= "9"),
            )
            .join(" ");
          record.title = title;

          return record;
        });

        records.sort((a, b) => a.distance - b.distance);
        setRecords(records);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchCarparkAvailability = ({
    records,
    record,
    avail,
    setRecords,
    setRecord,
    setAvail,
  }) => {
    const url = `https://api.data.gov.sg/v1/transport/carpark-availability`;
    fetch(url, { method: "GET", mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setAvail(data.items[0].carpark_data);

        if (records.length > 0) {
          setRecords(
            records.map((rec) => {
              const carpark = avail.find(
                (el) => el.carpark_number === rec.car_park_no,
              );
              if (carpark) {
                rec.totalLots = carpark.carpark_info[0].total_lots;
                rec.lotsAvailable = carpark.carpark_info[0].lots_available;
              }
              if (rec.address === record.address) {
                setRecord(rec);
              }
              return rec;
            }),
          );
        }
      })
      .catch((error) => {
        console.error("Error retrieving availability", error);
      });
  };

  firstLoadFetch = (
    latitude,
    longitude,
    { setRecords, setAvail, forceUpdate },
  ) => {
    fetch(
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_23f946fa557947f93a8043bbef41dd09&limit=5000",
      {
        method: "GET",
      },
    )
      .then((response) => response.json())
      .then((data) => {
        let records = data.result.records;
        records = records.map((record) => {
          record.x_coord = parseFloat(record.x_coord);
          record.y_coord = parseFloat(record.y_coord);
          const wgsCoord = SVYtoWGS(record.x_coord, record.y_coord);
          const lat = wgsCoord.latitude;
          const lon = wgsCoord.longitude;
          record.latitude = lat;
          record.longitude = lon;
          record.distance = getDistance(
            { latitude, longitude },
            { latitude: lat, longitude: lon },
          );
          const title = record.address
            .split(" ")
            .filter(
              (word) =>
                word !== "BLK" &&
                !(word.charAt(0) >= "0" && word.charAt(0) <= "9"),
            )
            .join(" ");
          record.title = title;

          return record;
        });

        records.sort((a, b) => a.distance - b.distance);
        setRecords(records);
        return records;
      })
      .then((records) => {
        const url = `https://api.data.gov.sg/v1/transport/carpark-availability`;
        fetch(url, { method: "GET", mode: "cors" })
          .then((response) => response.json())
          .then((data) => {
            setAvail(data.items[0].carpark_data);
            if (records.length > 0) {
              setRecords(
                records.map((record) => {
                  const carpark = data.items[0].carpark_data.find(
                    (el) => el.carpark_number === record.car_park_no,
                  );
                  if (carpark) {
                    record.totalLots = parseInt(
                      carpark.carpark_info[0].total_lots,
                    );
                    record.lotsAvailable = parseInt(
                      carpark.carpark_info[0].lots_available,
                    );
                  }
                  return record;
                }),
              );
            }
            forceUpdate();
          })
          .catch((error) => {
            console.error("Error retrieving availability", error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchQuery = (query, authToken, setSearchResults) => {
    const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${query}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.results || []);
      })
      .catch((error) => console.error("Error:", error));
  };

  filter = (
    records,
    {
      freeParking,
      availFilter,
      nightParking,
      heightRestriction,
      avail,
      availabilityLimit,
    },
  ) => {
    const recordRepository = new RecordRepository(records);
    return recordRepository.filter({
      freeParking,
      availFilter,
      nightParking,
      heightRestriction,
      avail,
      availabilityLimit,
    });
  };
}

function SVYtoWGS(x, y) {
  // SVY21 projection parameters
  const refLat = 1.366666,
    refLong = 103.833333;
  const originX = 38744.572,
    originY = 28001.642; // False Easting in meters
  const k0 = 1.0; // Scale factor
  const a = 6378137; // Semi-major axis of WGS84 ellipsoid
  const f = 1 / 298.257223563; // Flattening of WGS84 ellipsoid
  const e2 = 2 * f - f * f; // Eccentricity squared
  const A0 = 1 - e2 / 4 - (3 * e2 ** 2) / 64 - (5 * e2 ** 3) / 256;
  const A2 = (3 / 8) * (e2 + e2 ** 2 / 4 + (15 * e2 ** 3) / 128);
  const A4 = (15 / 256) * (e2 ** 2 + (3 * e2 ** 3) / 4);
  const A6 = (35 * e2 ** 3) / 3072;
  const lat0 = (refLat * Math.PI) / 180;
  const long0 = (refLong * Math.PI) / 180;
  const E = x - originY,
    N = y - originX;
  const M0 =
    a *
    (A0 * lat0 -
      A2 * Math.sin(2 * lat0) +
      A4 * Math.sin(4 * lat0) -
      A6 * Math.sin(6 * lat0));
  const M = M0 + N / k0;
  const mu = M / (a * A0);
  const e1 = (1 - Math.sqrt(1 - e2)) / (1 + Math.sqrt(1 - e2));
  const J1 = (3 / 2) * e1 - (27 / 32) * e1 ** 3;
  const J2 = (21 / 16) * e1 ** 2 - (55 / 32) * e1 ** 4;
  const J3 = (151 / 96) * e1 ** 3;
  const J4 = (1097 / 512) * e1 ** 4;
  const fp_lat =
    mu +
    J1 * Math.sin(2 * mu) +
    J2 * Math.sin(4 * mu) +
    J3 * Math.sin(6 * mu) +
    J4 * Math.sin(8 * mu);
  const e2_prime = e2 / (1 - e2);
  const C1 = e2_prime * Math.cos(fp_lat) ** 2;
  const T1 = Math.tan(fp_lat) ** 2;
  const R1 = (a * (1 - e2)) / (1 - e2 * Math.sin(fp_lat) ** 2) ** 1.5;
  const N1 = a / Math.sqrt(1 - e2 * Math.sin(fp_lat) ** 2);
  const D = E / (N1 * k0);
  const lat_rad =
    fp_lat -
    ((N1 * Math.tan(fp_lat)) / R1) *
      (D ** 2 / 2 -
        ((5 + 3 * T1 + 10 * C1 - 4 * C1 ** 2 - 9 * e2_prime) * D ** 4) / 24 +
        ((61 +
          90 * T1 +
          298 * C1 +
          45 * T1 ** 2 -
          252 * e2_prime -
          3 * C1 ** 2) *
          D ** 6) /
          720);
  const long_rad =
    long0 +
    (D -
      ((1 + 2 * T1 + C1) * D ** 3) / 6 +
      ((5 - 2 * C1 + 28 * T1 - 3 * C1 ** 2 + 8 * e2_prime + 24 * T1 ** 2) *
        D ** 5) /
        120) /
      Math.cos(fp_lat);
  const latitude = (lat_rad * 180) / Math.PI;
  const longitude = (long_rad * 180) / Math.PI;
  return { latitude, longitude };
}
