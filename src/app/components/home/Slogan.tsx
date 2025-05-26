// src/app/components/Slogan.tsx
"use client";

import React from "react";

interface SloganProps {
  theme?: "light" | "dark";
}

const Slogan: React.FC<SloganProps> = ({ theme = "light" }) => {
  // Base classes applicable to both themes
  const baseClasses =
    "mb-8 p-0 text-center font-['Press_Start_2P'] text-2xl leading-[1.6]";

  // Theme-specific classes
  const themeConfig = {
    light: {
      textColor: "text-[#FFEB3B]", // Gyllen tekstfarge for lyst tema
      // Enda mer subtil tekstskygge: Kun en mørk, lett forskjøvet skygge
      textShadowClass: "[text-shadow:1px_1px_0px_rgba(0,0,0,0.4)]",
    },
    dark: {
      textColor: "text-[#FFF176]", // Lysere gyllen tekstfarge for mørkt tema
      // Enda mer subtil tekstskygge: Kun en mørk, lett forskjøvet skygge
      textShadowClass: "[text-shadow:1px_1px_0px_rgba(0,0,0,0.3)]", // Litt lysere skyggealpha for mørkt tema for balanse
    },
  };

  const currentThemeConfig = themeConfig[theme];

  return (
    <div
      className={`
        ${baseClasses}
        ${currentThemeConfig.textColor}
        ${currentThemeConfig.textShadowClass}
      `}
    >
      <p>"Sharpen your mind, the board is set!"</p>
      <p>Are you ready to conquer the board?</p>
    </div>
  );
};

export default Slogan;
