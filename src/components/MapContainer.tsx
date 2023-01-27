import { MapMarker, Map } from "react-kakao-maps-sdk";

declare global {
  interface Window {
    kakao: any;
  }
}
interface Mapprops {
  location: {
    lng: string;
    lat: string;
  };
}
const MapContainer = (props: Mapprops) => {
  const { location } = props;
  console.log(location.lng);
  const lat = Number(location.lat);
  const lng = Number(location.lng);
  console.log(lng);
  return (
    <Map
      center={{ lat: lat, lng: lng }}
      style={{ width: "100%", height: "300px" }}>
      <MapMarker position={{ lat: lat, lng: lng }}>
        <div style={{ color: "#000" }}>여기!</div>
      </MapMarker>
    </Map>
  );
};

export default MapContainer;
