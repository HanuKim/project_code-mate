import styled from "styled-components";
import { MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { Mapprops } from "../../shared/type";

declare global {
  interface Window {
    kakao: any;
  }
}

const MapContainer = (props: Mapprops) => {
  const { location } = props;
  // 문자열로 DB에 들어가기 때문에, Number 형식으로 변환시켜줌.
  const lat = Number(location.lat);
  const lng = Number(location.lng);

  return (
    <Map
      center={{ lat: lat, lng: lng }}
      style={{ width: "100%", height: "300px" }}
      level={2}
    >
      <CustomOverlayMap position={{ lat: lat, lng: lng }}>
        <MapMarker position={{ lat: lat, lng: lng }}>
          <InfoWindow>여기!</InfoWindow>
        </MapMarker>
      </CustomOverlayMap>
    </Map>
  );
};

export default MapContainer;

const InfoWindow = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  color: #f80f64;
  font-size: 14px;
  font-weight: bold;
  transition-duration: 0.3s;
  :hover {
    background-color: #262b7f;
    color: #f2f2f2;
    transform: scale(1.2);
    border-radius: 10px;
  }
`;
