import { useEffect, useRef } from "react";
import "./style.css";

const ParallaxBackground = () => {
  const skyRefs = [useRef(null), useRef(null)];
  const buildingsRefs = [useRef(null), useRef(null)];

  const speedSky = 0.1; // O céu se move mais devagar
  const speedBuildings = 0.3; // Os prédios se movem mais rápido
  const scrollSpeed = 2; // Velocidade do deslocamento
  const screenWidth = window.innerWidth;

  useEffect(() => {
    let offsetSky = 0;
    let offsetBuildings = 0;

    const animate = () => {
      offsetSky -= scrollSpeed * speedSky;
      offsetBuildings -= scrollSpeed * speedBuildings;

      // Reposiciona os blocos quando saírem totalmente da tela
      if (offsetSky <= -screenWidth) offsetSky += screenWidth;
      if (offsetBuildings <= -screenWidth) offsetBuildings += screenWidth;

      skyRefs.forEach((ref, index) => {
        if (ref.current) {
          (ref.current as any).style.transform = `translateX(${offsetSky + index * screenWidth}px)`;
        }
      });

      buildingsRefs.forEach((ref, index) => {
        if (ref.current) {
          (ref.current as any).style.transform = `translateX(${offsetBuildings + index * screenWidth}px)`;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animate as any);
  }, []);

  return (
    <div className="parallax-container">
      {skyRefs.map((ref, index) => (
        <div key={index} className="parallax-layer sky-layer" ref={ref}></div>
      ))}

      {buildingsRefs.map((ref, index) => (
        <div key={index} className="parallax-layer buildings-layer" ref={ref}></div>
      ))}
      <div className="pogChamp"></div>
    </div>
  );
};

export default ParallaxBackground;
