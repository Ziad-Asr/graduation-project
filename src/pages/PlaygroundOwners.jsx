import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import styles from "./PlaygroundOwners.module.css";
import { fetchPlaygroundOwners } from "../store/slices/playgroundOwners/thunk";

const PlaygroundOwners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { owners, loading, error } = useSelector(
    (state) => state.playgroundOwnersSlice
  );

  useEffect(() => {
    dispatch(fetchPlaygroundOwners());
  }, [dispatch]);

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: (row) => row.email || "N/A",
      sortable: true,
      center: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber || "N/A",
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
            navigate(`/playgrounds-owners/edit/${row.id}`);
          }}
        />
      ),
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

  return (
    <div className={styles["owners-container"]}>
      <div className={styles["add-button-container"]}>
        <h1>Playground Owners</h1>
      </div>

      <div className={styles["owners-content"]}>
        {loading ? (
          <div className={styles.loading}>Loading owners...</div>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <DataTable
            columns={columns}
            data={owners || []}
            pagination
            paginationPerPage={6}
            paginationRowsPerPageOptions={[6, 10, 15]}
            customStyles={customStyles}
            highlightOnHover
            noDataComponent={
              <div className={styles.noData}>No owners found</div>
            }
          />
        )}
      </div>
    </div>
  );
};

export default PlaygroundOwners;
