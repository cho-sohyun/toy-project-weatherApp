import React from "react";

const WeatherBox = ({ weather, hourlyWeather }) => {
  if (!weather || !weather.main || !weather.weather) {
    return <div>날씨 정보를 불러오는 중입니다.</div>;
  }
  // API에서 받아오는 날씨 상태
  const weatherType = weather?.weather[0].main;
  const weatherDescription = weather?.weather[0].description;

  // 날씨 타입별 이미지 매칭
  const weatherDataMap = {
    Clear: { image: "/images/sunny2.jpg", emoji: "☀️" },
    Clouds: { image: "/images/cloud.jpg", emoji: "☁️" },
    Rain: { image: "/images/rain.jpg", emoji: "🌧️" },
    Snow: { image: "/images/snow.jpg", emoji: "☃️" },
    Drizzle: { image: "/images/rain.jpg", emoji: "🌧️" },
    Thunderstorm: { image: "/images/rain.jpg", emoji: "🌧️" },
    Mist: { image: "/images/cloud.jpg", emoji: "🌧️" },
    Fog: { image: "/images/cloud.jpg", emoji: "☁️" },
    Squall: { image: "/images/windy.jpg", emoji: "☁️" },
  };

  const weatherData = weatherDataMap[weatherType] || {
    image: "/images/default.jpg",
    emoji: "🌈",
  };

  return (
    <div className="weahter-box">
      <div className="weather-image-box">
        <div className="weather-image-circle">
          <img
            className="weather-image"
            src={weatherData.image}
            alt={weatherType}
          />
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
            const hourlyType = item.weather[0].main;
            const hourlyData = weatherDataMap[hourlyType] || { emoji: "🌈" };
            return (
              <div className="hourly-item" key={index}>
                <div className="hour">{hour}시</div>
                <div className="emoji">{hourlyData.emoji}</div>
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
