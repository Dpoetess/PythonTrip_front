import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./banner.css";

const images = [
  { src: "https://cdn.pixabay.com/photo/2018/09/04/22/48/guggenheim-3654928_1280.jpg", },
  { src: "https://cdn.pixabay.com/photo/2017/02/13/22/50/tower-2064129_1280.jpg", },
  { src: "https://cdn.pixabay.com/photo/2013/10/06/16/43/sky-191617_1280.jpg", },
  { src: "https://cdn.pixabay.com/photo/2022/11/09/13/39/landscape-7580627_1280.jpg", },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate(images[currentIndex].link);
  };

  return (
    <div className="banner" id="banner" onClick={handleClick}>
      <img
        src={images[currentIndex].src}
        alt="Banner"
        style={{ width: "100%", cursor: "pointer" }}
      />
    </div>
  );
};

export default Banner;
