// src/app/components/PopcornStyleGoLogo.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PopcornStyleGoLogoProps {
  theme?: "light" | "dark";
}

const PopcornStyleGoLogo: React.FC<PopcornStyleGoLogoProps> = ({
  theme = "light",
}) => {
  // Definer stiler for logo-teksten basert på tema
  const logoTextConfig = {
    light: {
      textColor: "text-[#FFEB3B]", // Gyllen farge for lyst tema
      // Subtil mørk skygge, lik den siste Slogan-oppdateringen
      textShadow: "[text-shadow:1px_1px_0px_rgba(0,0,0,0.4)]",
    },
    dark: {
      textColor: "text-[#FFF176]", // Lysere gyllen farge for mørkt tema
      // Subtil mørk skygge, med litt lysere alpha for balanse mot mørk tekstfarge
      textShadow: "[text-shadow:1px_1px_0px_rgba(0,0,0,0.3)]",
    },
  };

  const currentTextStyles = logoTextConfig[theme];

  return (
    <Link
      href="/"
      className="group flex flex-col items-center space-y-1 cursor-pointer"
      aria-label="Hjem"
    >
      {/* Container for the image, handles hover effects */}
      <div className="transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:rotate-2">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png"
          alt="Go Spill Logo (Popcorn Style)"
          width={56} // Intrinsic width of the image for Next.js optimization
          height={56} // Intrinsic height of the image for Next.js optimization
          className="h-12 w-auto sm:h-14" // Tailwind classes for responsive sizing
          priority // Preload this image as it's likely important
          onError={(e) => {
            // Get the target HTMLImageElement
            const target = e.target as HTMLImageElement;
            // Hide the broken image icon
            target.style.display = "none";
            const placeholderParent = target.parentNode;
            // Check if a parent node exists
            if (placeholderParent) {
              // Create a new div element for the placeholder
              const placeholder = document.createElement("div");
              placeholder.textContent = "Go!";
              // Apply Tailwind classes directly to the dynamically created placeholder
              placeholder.className = `w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-red-500 text-white font-bold rounded`;
              // Insert the placeholder into the DOM
              placeholderParent.insertBefore(placeholder, target.nextSibling);
            }
          }}
        />
      </div>
      {/* Logo text, using h1 as per your page.tsx structure */}
      <h1
        className={`
          font-['Press_Start_2P'] {/* Pikselert font */}
          text-xl {/* Størrelse for logo-teksten */}
          ${currentTextStyles.textColor} {/* Temabasert tekstfarge */}
          ${currentTextStyles.textShadow} {/* Oppdatert, subtil temabasert tekstskygge */}
          tracking-wider {/* Justert letter-spacing for pikselert font */}
          transition-opacity duration-300 ease-in-out group-hover:opacity-75
          pt-2 {/* Liten padding-top for å justere avstand etter fontbytte */}
        `}
      >
        GO GAME
      </h1>
    </Link>
  );
};

export default PopcornStyleGoLogo;
