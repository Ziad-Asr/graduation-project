import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchPlaygroundOwners } from "../store/slices/playgroundOwners/thunk";

const PlaygroundOwners = () => {
  const dispatch = useDispatch();
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
  ];

  const customStyles = {
    rows: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontSize: "15px",
        minHeight: "50px",
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
    <div className="container">
      {loading ? (
        <div
          style={{
            color: "black",
            fontSize: "16px",
            textAlign: "center",
            margin: "20px 0",
            fontWeight: "bold",
          }}
        >
          Loading owners...
        </div>
      ) : error ? (
        <div
          style={{
            color: "red",
            fontSize: "16px",
            textAlign: "center",
            margin: "20px 0",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      ) : (
        <DataTable
          title="Playground Owners List"
          defaultSortAsc={false}
          pagination
          highlightOnHover
          columns={columns}
          data={owners || []}
          customStyles={customStyles}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 25]}
          paginationPerPage={10}
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
              No owners found
            </div>
          }
        />
      )}
    </div>
  );
};

export default PlaygroundOwners;
