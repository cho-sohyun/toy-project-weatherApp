import React from "react";

const WeatherBox = ({ weather }) => {
  // API에서 받아오는 날씨 상태
  const weatherType = weather?.weather[0].main;
  const weatherDescription = weather?.weather[0].description;

  // 날씨 타입별 이미지 매칭
  const weatherImages = {
    Clear: "/images/sunny2.jpg",
    Clouds: "/images/cloud.jpg",
    Rain: "/images/rain.jpg",
    Snow: "/images/snow.jpg",
    Drizzle: "/images/rain.jpg",
    Thunderstorm: "/images/rain.jpg",
    Mist: "/images/cloud.jpg",
    Squall: "/images/windy.jpg",
  };

  const weatherImage = weatherImages[weatherType] || "/images/default.jpg";

  return (
    <div className="weahter-box">
      <div className="weather-image-box">
        <div className="weather-image-circle">
          <img className="weather-image" src={weatherImage} alt={weatherType} />
        </div>
      </div>

      <div className="weather-info">
        <h2 className="temperature">{Math.round(weather?.main.temp)}°</h2>
        <p className="weather-name">오늘 날씨는 {weatherDescription}</p>

        <div className="weather-details">
          <div className="details-left">
            <div className="detail">
              <span className="cold-title">최저</span>
              <span className="cold">
                {Math.round(weather?.main.temp_min)}°
              </span>
            </div>
            <div className="detail">
              <span className="hot-title">최고</span>
              <span className="hot">{Math.round(weather?.main.temp_max)}°</span>
            </div>
          </div>

          <div className="divider" />

          <div className="details-right">
            <div className="detail">
              <span>풍속</span>
              <span>{weather?.wind.speed}m/s</span>
            </div>
            <div className="detail">
              <span>체감온도</span>
              <span>{Math.round(weather?.main.feels_like)}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
