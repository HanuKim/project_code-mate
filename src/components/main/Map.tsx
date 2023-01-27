import { useState, useEffect } from "react";
import { MapProps } from "../..//shared/type";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Map = ({ state, setState }: any) => {
  const [searchAddress, SetSearchAddress] = useState();
  const infowindow = new kakao.maps.InfoWindow({ zindex: 1 });
  //스크립트 파일 읽어오기
  const new_script = (src: string) => {
    return new Promise((resolve: any, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    kakao.maps.load(() => {
      const mapContainer = document.getElementById("map") as HTMLElement;
      const options = {
        center: new kakao.maps.LatLng(state.center.lat, state.center.lng),
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, options);
      //마커가 표시 될 위치
      const markerPosition = new kakao.maps.LatLng(
        state.center.lat,
        state.center.lng
      );
      // 마커를 생성
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      // 마커를 지도 위에 표시
      marker.setMap(map);
    });
  }, [state.center.lat, state.center.lng]);
  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  const SearchMap = () => {
    const ps = new kakao.maps.services.Places();
    const placesSearchCB = function (
      data: any,
      status: any,
      pagination: any,
      result: any
    ) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = data[0];
        setState({
          center: { lat: newSearch.y, lng: newSearch.x },
        });
      }
    };
    ps.keywordSearch(searchAddress, placesSearchCB);
  };
  const handleSearchAddress = (e: any) => {
    SetSearchAddress(e.target.value);
  };

  return (
    <>
      <div
        id="map"
        style={{
          width: "100%",
          height: "600px",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
        }}
      />
      <div>
        <MapInput
          placeholder="주소를 입력해주세요."
          onChange={handleSearchAddress}
        />
        <MapSummitButton onClick={SearchMap}>확인</MapSummitButton>
      </div>
    </>
  );
};

export default Map;

const MapInput = styled.input`
  width: 80%;
  height: 80px;
  border-radius: 10px;
  padding: 15px 20px;
  resize: none;
  margin: 10px 0;
  outline-color: #262b7f;
`;
const MapSummitButton = styled.button`
  float: right;
  background-color: #ffffff;
  border: 1px solid #000000;
  width: 17%;
  height: 80px;
  border-radius: 10px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
