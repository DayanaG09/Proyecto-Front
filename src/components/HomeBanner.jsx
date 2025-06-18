import React, { useEffect, useState } from "react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import "../styles/HomeBanner.css"; // Asegúrate de tener este archivo CSS

const imagenes = [banner1, banner2, banner3];

function HomeBanner() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndice((prev) => (prev + 1) % imagenes.length);
    }, 4000); // cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  return (
   
      <div >
        <img
          src={imagenes[indice]}
          alt={`Banner ${indice + 1}`}
          className="banner-img"
        />
      </div>
    
  );
}

export default HomeBanner;
