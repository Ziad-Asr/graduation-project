import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import styles from "./PlaygroundOwners.module.css";
import {
  fetchPlaygroundOwners,
  approveOwner,
} from "../../store/slices/playgroundOwners/thunk";
import ReusablePopup from "../../components/ReusablePopup";

const PlaygroundOwners = () => {
  const dispatch = useDispatch();
  const { owners, loading, error } = useSelector(
    (state) => state.playgroundOwnersSlice
  );
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);

  useEffect(() => {
    dispatch(fetchPlaygroundOwners());
  }, [dispatch]);

  const handleApproveClick = (ownerId) => {
    setSelectedOwnerId(ownerId);
    setPopupOpen(true);
  };

  const handleApproveOwner = () => {
    dispatch(approveOwner(selectedOwnerId));
    setPopupOpen(false);

    setTimeout(() => {
      dispatch(fetchPlaygroundOwners());
    }, 500);
  };

  const closePopupHandler = () => {
    setPopupOpen(false);
  };

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
        <button
          style={{
            backgroundColor: row?.isApproved ? "green" : "red",
            color: "white",
            border: "none",
            width: "60px",
            height: "30px",
            fontSize: "18px",
            borderRadius: "10px",
            cursor: row?.isApproved ? "" : "pointer",
          }}
          onClick={() => {
            if (!row?.isApproved) handleApproveClick(row.id);
          }}
        >
          {row?.isApproved ? "True" : "False"}
        </button>
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
      <ReusablePopup
        isOpen={popupOpen}
        onClose={closePopupHandler}
        text="This owner is not approved yet"
        buttonText="Approve"
        buttonClassName="approve-button"
        onButtonClick={handleApproveOwner}
      />
    </div>
  );
};

export default PlaygroundOwners;
