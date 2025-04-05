import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const WeatherButton = ({ cities, setCity }) => {
  const [show, setShow] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCitySelect = (cityValue) => {
    setSelectedCity(cityValue);
    setCity(cityValue === "current" ? "" : cityValue);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        지역선택
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>지역을 선택하세요</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="city-button-group">
            {cities.map((city, index) => (
              <Button
                key={index}
                variant={
                  selectedCity === city.value ? "primary" : "outline-secondary"
                }
                className={`city-button ${
                  selectedCity === city.value ? "selected" : ""
                }`}
                onClick={() => handleCitySelect(city.value)}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WeatherButton;
