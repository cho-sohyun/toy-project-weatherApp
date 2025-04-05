/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox.jsx";
import WeatherButton from "./component/WeatherButton.jsx";
import Spinner from "react-bootstrap/Spinner";

// 앱이 실행되자마자 현재 위치 기반의 날씨 정보
// 날씨 정보에는 도시, 온도, 날씨 상태
// 지역 설정 기능 (버튼?,모달?)
// 지역별 날씨 정보
// 현재 위치를 다시 설정하면, 다시 현재 위치 기반의 날씨 출력
// 로딩중에는 로딩 스피너

function App() {
  const [weather, setWeather] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const cities = [
    { name: "내 위치", value: "current" },
    { name: "서울", value: "seoul" },
    { name: "부산", value: "busan" },
    { name: "제주", value: "jeju" },
    { name: "인천", value: "incheon" },
    { name: "대구", value: "daegu" },
    { name: "울산", value: "ulsan" },
    { name: "수원", value: "suwon" },
    { name: "창원", value: "changwon" },
    { name: "전주", value: "jeonju" },
    { name: "고양", value: "goyang" },
  ];

  let apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

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
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setWeather(data);
    setLoading(false);
    getHourlyWeather(lat, lon);
  };

  // 도시별 날씨 API 호출
  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=kr`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    getHourlyWeather(data.coord.lat, data.coord.lon);
    setLoading(false);
    console.log(data);
  };

  // 시간별 출력 함수
  const getHourlyWeather = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
    let response = await fetch(url);
    let data = await response.json();

    // 오늘 날짜 문자열 추출
    const today = new Date().toISOString().split("T")[0];

    // '오늘'에 해당하는 시간대만 필터링
    const todayForecast = data.list.filter((item) =>
      item.dt_txt.startsWith(today)
    );

    setHourlyWeather(todayForecast.slice(0, 8));
  };

  const getFormattedDate = () => {
    const date = new Date();
    const options = { month: "long", day: "numeric", weekday: "long" };
    return date.toLocaleDateString("ko-KR", options);
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
      setCurrentDate(getFormattedDate());
    } else {
      getWeatherByCity();
      setCurrentDate(getFormattedDate());
    }
  }, [city]);

  return (
    <div className="main-container">
      <div className="header">
        <div className="location">
          <div>현재 위치</div>
          <div className="city-name">{weather?.name}</div>
        </div>
        <div className="date">{currentDate}</div>
        <div className="weather-btn">
          <WeatherButton cities={cities} setCity={setCity} />
        </div>
      </div>
      <div className="weather-container">
        {loading ? (
          <Spinner animation="border" role="status"></Spinner>
        ) : (
          <WeatherBox
            weather={weather}
            setCity={setCity}
            hourlyWeather={hourlyWeather}
          />
        )}
      </div>
    </div>
  );
}
export default App;
