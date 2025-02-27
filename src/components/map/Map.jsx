import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const center = [29.36, 47.983];

const markers = [
  { position: [29.36, 47.984], name: "Marker 1" },
  { position: [29.36, 47.989], name: "Marker 2" },
  { position: [29.364, 47.987], name: "Marker 3" },
];

const Map = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "350px",
        marginBottom: "20px",
        overflow: "hidden",
        backgroundColor: "red",
      }}
    >
      <MapContainer
        center={center}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
