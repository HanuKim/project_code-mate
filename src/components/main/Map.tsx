import { useState, useEffect } from "react";
import { MapProps } from "../..//shared/type";
import styled from "styled-components";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { dbService, authService } from "../../shared/firebase";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const Map = ({ state, setState }: any) => {
  const [searchAddress, SetSearchAddress] = useState(); //서치검색어를 담은 상수
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
  //maps의 좌표가 변경될 때마다 실행되지 않도록 useffect사용
  useEffect(() => {
    kakao.maps.load(() => {
      const mapContainer = document.getElementById("map") as HTMLElement;
      const options = {
        center: new kakao.maps.LatLng(state.center.lat, state.center.lng), //좌표 state 를 props로 받아옴
        level: 3, //확대
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
  // }, [state.center.lat, state.center.lng]);

  // 주소 입력후 검색 클릭 시 원하는 주소로 이동
  const SearchMap = () => {
    //카카오 키워드 검색 라이브러리
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
      {/* 맵 컨테이너 */}
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
      <MapSearchContainer>
        {/* 주소창 */}
        <MapInput
          placeholder="주소를 입력해주세요."
          onChange={handleSearchAddress}
        />
        {/* onclick시 검색한 키워드의 지도 좌표를 띄움 */}
        <MapSummitButton onClick={SearchMap}>확인</MapSummitButton>
      </MapSearchContainer>
    </>
  );
};

export default Map;

const MapSearchContainer = styled.div`
  width: 100%;
  margin: 10px 0;
`;
const MapInput = styled.input`
  width: 80%;
  height: 80px;
  border-radius: 10px;
  border: 1px solid #a8a8a8;
  padding: 15px 20px;
  resize: none;
  margin: 10px 0;
`;
const MapSummitButton = styled.button`
  float: right;
  background-color: #ffffff;
  border: 1px solid #a8a8a8;
  width: 15%;
  height: 80px;
  border-radius: 10px;
  margin: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
