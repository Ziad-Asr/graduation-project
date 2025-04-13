import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { fetchFacilities } from "../store/slices/facilities/thunk";
import SecondTopbar from "../components/secondTopbar/SecondTopbar";
import Map from "../components/map/Map";

const Facilities = () => {
  const dispatch = useDispatch();
  const { facilities } = useSelector((state) => state.facilitiesSlice);

  console.log("facilities");
  console.log(facilities);

  useEffect(() => {
    dispatch(fetchFacilities());
  }, [dispatch]);

  const facilityLocations = facilities.map((facility) => ({
    id: facility.id,
    position: [facility.address.latitude, facility.address.longitude],
    name: facility.name,
  }));

  const columns = [
    {
      name: "Facility Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "City",
      selector: (row) => row.address.city,
      sortable: true,
      center: true,
    },
    {
      name: "Street Address",
      selector: (row) => row.address.streetAddress,
      sortable: true,
      center: true,
    },
    {
      name: "Opening Time",
      selector: (row) => row.openingTime,
      sortable: true,
      center: true,
    },
    {
      name: "Closing Time",
      selector: (row) => row.closingTime,
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
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f7f7f7",
        color: "#797981",
        fontWeight: "bold",
        fontSize: "15px",
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
    <>
      <SecondTopbar />

      <div className="container">
        <Map locations={facilityLocations} />

        <DataTable
          noHeader
          defaultSortAsc={false}
          pagination
          highlightOnHover
          columns={columns}
          data={facilities || []}
          customStyles={customStyles}
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
      </div>
    </>
  );
};

export default Facilities;
