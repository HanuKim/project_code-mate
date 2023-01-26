import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const mapContainer = useRef(null);
  const position = new window.kakao.maps.LatLng(
    37.50245699481023,
    127.04453897838009
  );
  const mapOptions = {
    center: position, // 지도의 중심좌표
    level: 2, // 지도의 확대 레벨
  };

  useEffect(() => {
    const map = new window.kakao.maps.Map(mapContainer.current, mapOptions);
    const marker = new window.kakao.maps.Marker({ position }); // 마커 생성

    // 커스텀 오버레이에 표출될 내용
    const content = `
  <div class="customoverlay">
    <span>스파르타 코딩클럽</span>
  </div>`;

    // 커스텀 오버레이 생성
    new window.kakao.maps.CustomOverlay({
      map,
      position,
      content,
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{
        width: "100%",
        height: "300px",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
      }}></div>
  );
};

export default Map;
