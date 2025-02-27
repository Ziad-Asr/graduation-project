import DataTable from "react-data-table-component";
import SecondTopbar from "../components/secondTopbar/SecondTopbar";
import Map from "../components/map/Map";

const playgrounds = [
  {
    name: "Blue Sky Park",
    location: "Cairo",
    size: "Large",
    facilities: "Swings, Climbing Wall, Outdoor Gym",
    contact: "+20 1015674321",
  },
  {
    name: "Riverfront Play Area",
    location: "Alexandria",
    size: "Medium",
    facilities: "Slides, Water Fountain, Jogging Track",
    contact: "+20 1026785432",
  },
  {
    name: "Golden Sands Park",
    location: "Hurghada",
    size: "Large",
    facilities: "Beach Access, Volleyball Court, Play Zone",
    contact: "+20 1037896543",
  },
  {
    name: "Palm Breeze Playground",
    location: "Sharm El-Sheikh",
    size: "Small",
    facilities: "Trampoline, Kids Zone, Mini Golf",
    contact: "+20 1048907654",
  },
  {
    name: "Hilltop Fun Park",
    location: "Giza",
    size: "Medium",
    facilities: "Basketball Court, Play Area, Open Gym",
    contact: "+20 1059018765",
  },
  {
    name: "Sunny Meadows",
    location: "Aswan",
    size: "Large",
    facilities: "Slides, Swings, Football Field",
    contact: "+20 1060129876",
  },
  {
    name: "Adventure Cove",
    location: "Luxor",
    size: "Medium",
    facilities: "Zip Line, Rock Climbing, Rope Course",
    contact: "+20 1071230987",
  },
  {
    name: "Green Oasis Park",
    location: "Mansoura",
    size: "Small",
    facilities: "Benches, Open Fields, Walking Trails",
    contact: "+20 1082341098",
  },
  {
    name: "Forest Playland",
    location: "Tanta",
    size: "Large",
    facilities: "Playground, Kids Gym, Nature Trails",
    contact: "+20 1093452109",
  },
  {
    name: "Desert Bloom Park",
    location: "Minya",
    size: "Medium",
    facilities: "Skating Area, Picnic Tables, Jogging Track",
    contact: "+20 1104563210",
  },
  {
    name: "Mountain View Playground",
    location: "Sohag",
    size: "Small",
    facilities: "Swings, Slides, Rock Climbing",
    contact: "+20 1115674321",
  },
  {
    name: "Starry Night Park",
    location: "Fayoum",
    size: "Large",
    facilities: "Carousel, Swings, Play Area",
    contact: "+20 1126785432",
  },
  {
    name: "Seaside Fun Zone",
    location: "Damietta",
    size: "Medium",
    facilities: "Beach Area, Water Slides, Kids Play Zone",
    contact: "+20 1137896543",
  },
  {
    name: "Magic Valley Park",
    location: "Beni Suef",
    size: "Small",
    facilities: "Climbing Wall, Rope Course, Mini Trampoline",
    contact: "+20 1148907654",
  },
  {
    name: "Dreamland Playground",
    location: "Ismailia",
    size: "Large",
    facilities: "Skate Park, Open Gym, Football Field",
    contact: "+20 1159018765",
  },
  {
    name: "Lush Gardens Park",
    location: "Zagazig",
    size: "Medium",
    facilities: "Tennis Court, Walking Trails, Swings",
    contact: "+20 1160129876",
  },
  {
    name: "Sunflower Park",
    location: "Kafr El-Sheikh",
    size: "Small",
    facilities: "Slides, Benches, Fountain",
    contact: "+20 1171230987",
  },
  {
    name: "Blue Lagoon Playground",
    location: "Suez",
    size: "Large",
    facilities: "Boating, Water Sports, Kids Play Area",
    contact: "+20 1182341098",
  },
  {
    name: "Wildwood Adventure Park",
    location: "New Cairo",
    size: "Medium",
    facilities: "Zip Line, Obstacle Course, Rock Climbing",
    contact: "+20 1193452109",
  },
  {
    name: "Rainbow Kids Park",
    location: "Port Said",
    size: "Large",
    facilities: "Trampoline, Slides, Swings, Kids Gym",
    contact: "+20 1204563210",
  },
];

const PlaygroundsPage = () => {
  const columns = [
    {
      name: "Playground Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
      center: true,
    },
    {
      name: "Size",
      selector: (row) => row.size,
      sortable: true,
      center: true,
    },
    {
      name: "Facilities",
      selector: (row) => row.facilities,
      sortable: false,
      center: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: false,
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
        <Map />

        <DataTable
          noHeader
          defaultSortAsc={false}
          pagination
          highlightOnHover
          columns={columns}
          data={playgrounds || []}
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

export default PlaygroundsPage;
