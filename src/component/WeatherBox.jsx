import React from "react";

const WeatherBox = ({ weather, hourlyWeather }) => {
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

        <div className="weather-cards">
          <div className="weather-card">
            <p>최저기온</p>
            <p className="cold">{Math.round(weather?.main.temp_min)}°</p>
          </div>
          <div className="weather-card">
            <p>최고기온</p>
            <p className="hot">{Math.round(weather?.main.temp_max)}°</p>
          </div>
          <div className="weather-card">
            <p>풍속</p>
            <span>{weather?.wind.speed}m/s</span>
          </div>
          <div className="weather-card">
            <p>체감온도</p>
            <span>{Math.round(weather?.main.feels_like)}°</span>
          </div>
        </div>
      </div>
      {/* 시간대별 날씨 */}
      <div className="hourly-weather-wrapper">
        <h4 className="hourly-title">시간대별 날씨</h4>
        <div className="hourly-weather-row">
          {hourlyWeather.map((item, index) => {
            const hour = new Date(item.dt * 1000).getHours();
            return (
              <div className="hourly-item" key={index}>
                <div className="hour">{hour}시</div>
                <div className="temp">{Math.round(item.main.temp)}°</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
