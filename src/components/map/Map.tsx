import { useState, useEffect } from "react";
import styled from "styled-components";

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
    // {/* 맵 컨테이너 */}
    <Container>
      <div
        id="map"
        style={{
          width: "100%",
          height: "300px",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
        }}
      />
      <MapSearchContainer>
        {/* 주소창 */}
        <MapInput
          placeholder="프로젝트를 위해 만날 장소(건물 이름, 지하철역 등)를 입력해주세요."
          onChange={handleSearchAddress}
        />
        {/* onclick시 검색한 키워드의 지도 좌표를 띄움 */}
        <MapSummitButton onClick={SearchMap}>여기서 만나요!</MapSummitButton>
      </MapSearchContainer>
    </Container>
  );
};

export default Map;

const Container = styled.div`
  width: 100%;
  height: 100%;

  margin-bottom: 30px;
`;

const MapSearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin: 10px 0;
  margin-bottom: 50px;
`;
const MapInput = styled.input`
  width: 83%;
  height: 80px;
  margin: 10px 0;
  padding: 15px 20px;

  border: 1px solid #aaa;
  border-radius: 10px;

  resize: none;
  transition-duration: 0.3s;

  :focus {
    border: none;
    box-shadow: 3px 3px 3px #aaa;
    background-color: #fff;
  }
`;

const MapSummitButton = styled.button`
  width: 15%;
  height: 80px;

  border: 1px solid #aaa;
  border-radius: 10px;

  font-size: 18px;
  color : #333;
  cursor: pointer;
  :hover {
    background-color: #262b7f;
    color: #ffffff;
  }
`;
