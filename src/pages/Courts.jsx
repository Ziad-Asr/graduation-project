import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchCourts } from "../store/slices/courts/thunk";
import { FaEdit } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Courts.module.css";

const Courts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courts, loading } = useSelector((state) => state.courtsSlice);

  useEffect(() => {
    dispatch(fetchCourts());
  }, [dispatch]);

  const columns = [
    {
      name: "Court Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Facility ID",
      selector: (row) => row.facilityId,
      sortable: true,
      center: true,
    },
    {
      name: "Sport ID",
      selector: (row) => row.sportId,
      sortable: true,
      center: true,
    },
    {
      name: "Capacity",
      selector: (row) => row.capacity,
      sortable: true,
      center: true,
    },
    {
      name: "Price Per Hour",
      selector: (row) => row.pricePerHour,
      sortable: true,
      center: true,
    },
    {
      name: "Edit",
      selector: (row) => (
        <FaEdit
          className={styles.editIcon}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/courts/edit/${row.id}`);
          }}
        />
      ),
      center: true,
    },
  ];

  return (
    <div className={styles["courts-container"]}>
      <div className={styles["add-button-container"]}>
        <h1>Courts</h1>
        <button
          className={styles["add-button"]}
          onClick={() => navigate("/courts/add")}
        >
          Add New Court
        </button>
      </div>

      <div className={styles["courts-content"]}>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <DataTable
            noHeader
            defaultSortAsc={false}
            pagination
            highlightOnHover
            columns={columns}
            data={courts || []}
            paginationRowsPerPageOptions={[5, 10, 15]}
            noDataComponent={
              <div
                style={{
                  color: "black",
                  fontSize: "16px",
                  textAlign: "center",
                  margin: "20px 0",
                  fontWeight: "bold",
                }}
              >
                There are no records to display
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default Courts;
