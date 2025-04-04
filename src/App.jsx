/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox.jsx";
import WeatherButton from "./component/WeatherButton.jsx";

// 앱이 실행되자마자 현재 위치 기반의 날씨 정보
// 날씨 정보에는 도시, 온도, 날씨 상태
// 지역 설정 기능 (버튼?,모달?)
// 지역별 날씨 정보
// 현재 위치를 다시 설정하면, 다시 현재 위치 기반의 날씨 출력
// 로딩중에는 로딩 스피너

function App() {
  const [weather, setWeather] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    getCurrentLocation();
    setCurrentDate(getFormattedDate());
  }, []);

  // 현재 위치 가져오는 함수
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log(lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 현재 위치 기반 날씨 API 호출
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=316bf0cb911a9b7cfce077ac5b715da7&units=metric&lang=kr`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setWeather(data);
  };

  const getFormattedDate = () => {
    const date = new Date();
    const options = { month: "long", day: "numeric", weekday: "long" };
    return date.toLocaleDateString("ko-KR", options);
  };

  return (
    <div className="main-container">
      <div className="header">
        <div className="location">
          <div>현재 위치</div>
          <div className="city-name">{weather?.name}</div>
        </div>
        <div className="date">{currentDate}</div>
        <div className="weather-btn">
          <WeatherButton />
        </div>
      </div>
      <div className="weather-container">
        <WeatherBox weather={weather} />
      </div>
    </div>
  );
}
export default App;
