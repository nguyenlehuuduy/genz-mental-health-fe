"use client";
import { useEffect, useState } from "react";

const Star = (removeStar: { removeStar: any }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const randomSize = Math.floor(Math.random() * 10) + 1; // Kích thước từ 1 đến 10px
    const randomX = Math.random() * window.innerWidth; // Vị trí X ngẫu nhiên trên màn hình
    const randomY = Math.random() * window.innerHeight; // Vị trí Y ngẫu nhiên trên màn hình

    setStyle({
      width: `${randomSize}px`,
      height: `${randomSize}px`,
      left: `${randomX}px`,
      top: `${randomY}px`,
    });
  }, []);

  return <div className="stars" style={style}></div>;
};

export default Star;
