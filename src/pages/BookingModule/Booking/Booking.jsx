import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import styles from "./Booking.module.css";
import { fetchCourts } from "../../../store/slices/courts/thunk";
import { fetchBookings } from "../../../store/slices/bookings/thunk";
import { toast } from "react-toastify";

const Booking = () => {
  const dispatch = useDispatch();
  const { courts = [] } = useSelector((state) => state.courtsSlice || {});
  const {
    bookings = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.bookingsSlice || {});
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    dispatch(fetchCourts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSearch = () => {
    if (selectedCourt && selectedDate) {
      dispatch(fetchBookings({ courtId: selectedCourt, date: selectedDate }));
    } else {
      toast.warning("Please select both court and date");
    }
  };

  const columns = [
    {
      name: "Booking ID",
      selector: (row) => row.id,
      sortable: true,
      center: true,
    },
    {
      name: "Court Name",
      selector: (row) => row.courtName,
      sortable: true,
      center: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      center: true,
    },
    {
      name: "Time Slot",
      selector: (row) => row.timeSlot,
      sortable: true,
      center: true,
    },
    {
      name: "User Name",
      selector: (row) => row.userName,
      sortable: true,
      center: true,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontSize: "15px",
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontWeight: "bold",
        fontSize: "15px",
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontSize: "15px",
      },
    },
  };

  // Ensure bookings is always an array
  const tableData = Array.isArray(bookings) ? bookings : [];

  return (
    <div className={styles["page"]}>
      <h1>Bookings</h1>

      <div className={styles["booking-container"]}>
        <div className={styles["filters-container"]}>
          <div className={styles["filter-group"]}>
            <label htmlFor="court">Select Court:</label>
            <select
              id="court"
              value={selectedCourt}
              onChange={(e) => setSelectedCourt(e.target.value)}
              className={styles["filter-select"]}
            >
              <option value="">Select a court</option>
              {courts.map((court) => (
                <option key={court.id} value={court.id}>
                  {court.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["filter-group"]}>
            <label htmlFor="date">Select Date:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={styles["filter-input"]}
            />
          </div>

          <button
            className={styles["search-button"]}
            onClick={handleSearch}
            disabled={!selectedCourt || !selectedDate}
          >
            Search
          </button>
        </div>

        <div className={styles["bookings-content"]}>
          <DataTable
            columns={columns}
            data={tableData}
            pagination
            paginationPerPage={6}
            paginationRowsPerPageOptions={[6, 10, 15]}
            customStyles={customStyles}
            highlightOnHover
            progressPending={loading}
            noDataComponent={<div className="no-data">No bookings found</div>}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
