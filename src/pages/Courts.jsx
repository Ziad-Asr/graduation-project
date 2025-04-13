import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchCourts } from "../store/slices/courts/thunk";
import SecondTopbar from "../components/secondTopbar/SecondTopbar";
import { Spinner } from "react-bootstrap";

const Courts = () => {
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
  ];

  return (
    <>
      <SecondTopbar />
      <div className="container my-4">
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
    </>
  );
};

export default Courts;
