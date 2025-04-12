// The RecordRepository class is an example of the Repository Pattern,
// which abstracts and encapsulates data access and filtering logic.
// This pattern helps separate the business logic from how data is retrieved or modified.
export default class RecordRepository {
  constructor(records) {
    // The repository is initialized with a collection of records.
    // This local state is what the repository manages and filters.
    this.records = records;
  }

  // This method filters the records to include only those with free parking.
  // It encapsulates one specific rule for data filtering.
  filterByFreeParking = () => {
    this.records = this.records.filter(
      (record) => record.free_parking !== "NO",
    );
  };

  // This method filters the records to include only those with night parking.
  filterByNightParking = () => {
    this.records = this.records.filter(
      (record) => record.night_parking === "YES",
    );
  };

  filterByAvailability = (availFilter, avail, availabilityLimit) => {
    if (!availFilter.available) {
      this.records = this.records.filter((record) => {
        const carpark = avail.find(
          (el) => el.carpark_number === record.car_park_no,
        );
        if (carpark) {
          const lotsAvailable = carpark.carpark_info[0].lots_available;
          const totalLots = carpark.carpark_info[0].total_lots;
          if (lotsAvailable / totalLots >= availabilityLimit) {
            return false;
          }
        }
        return true;
      });
    }

    if (!availFilter.limited) {
      this.records = this.records.filter((record) => {
        const carpark = avail.find(
          (el) => el.carpark_number === record.car_park_no,
        );
        if (carpark) {
          const lotsAvailable = carpark.carpark_info[0].lots_available;
          const totalLots = carpark.carpark_info[0].total_lots;
          if (
            lotsAvailable / totalLots > 0 &&
            lotsAvailable / totalLots < availabilityLimit
          ) {
            return false;
          }
        }
        return true;
      });
    }

    if (!availFilter.full) {
      this.records = this.records.filter((record) => {
        const carpark = avail.find(
          (el) => el.carpark_number === record.car_park_no,
        );
        if (carpark) {
          const lotsAvailable = carpark.carpark_info[0].lots_available;
          if (parseInt(lotsAvailable) === 0) {
            return false;
          }
        }
        return true;
      });
    }
  };

  filterByHeightRestriction = (heightRestriction) => {
    this.records = this.records.filter(
      (record) => parseFloat(record.gantry_height) >= heightRestriction,
    );
  };

  filter = ({
    freeParking,
    availFilter,
    nightParking,
    heightRestriction,
    avail,
    availabilityLimit,
  }) => {
    if (freeParking) {
      this.filterByFreeParking();
    }
    if (nightParking === "yes") {
      this.filterByNightParking();
    }

    this.filterByAvailability(availFilter, avail, availabilityLimit);

    if (heightRestriction > 0) {
      this.records = this.records.filter(
        (record) => parseFloat(record.gantry_height) >= heightRestriction,
      );
    }
    return this.records;
  };
}
