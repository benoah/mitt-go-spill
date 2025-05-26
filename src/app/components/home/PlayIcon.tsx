// src/app/components/PlayIcon.tsx
// src/app/components/home/PlayIcon.tsx
import React from "react";

interface PlayIconProps {
  fillColor?: string;
  outlineColor?: string;
  outlineWidth?: number;
  className?: string; // For å tillate ekstra CSS-klasser (f.eks. for størrelse via Tailwind hvis ønskelig)
  width?: string | number;
  height?: string | number;
}

const PlayIcon: React.FC<PlayIconProps> = ({
  fillColor = "#F8D048", // En lys, glad gulfarge (tenk Mario-mynt eller stjerne)
  outlineColor = "#784c24", // En mørk brunfarge, klassisk for omriss i Mario-spill
  outlineWidth = 2.5, // Tykkelsen på omrisset for en "chunky" look
  className,
  width = 22, // Standardbredde (litt større for å kompensere for tykt omriss)
  height = 22, // Standardhøyde
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24" // Holder viewBox konsistent for enkel koordinathåndtering
    xmlns="http://www.w3.org/2000/svg"
    className={className} // Tillater å sende inn egne klasser
    // fill="none" på SVG-elementet er ikke nødvendig her siden path-elementet spesifiserer fill og stroke
  >
    <path
      d="M8 5V19L19 12L8 5Z" // Den klassiske "play"-triangelformen
      fill={fillColor}
      stroke={outlineColor}
      strokeWidth={outlineWidth}
      strokeLinejoin="round" // Dette runder av hjørnene på omrisset, gir en mykere Mario-følelse
      // strokeLinecap="round" // Er mer relevant for linjer som ikke danner en lukket form
    />
    {/*
      Valgfritt: En liten indre highlight for å gi en 3D-effekt, vanlig i Mario UI-elementer.
      Dette ville vært en mindre trekant, litt forskjøvet, med en lysere farge eller hvit med litt gjennomsiktighet.
      Eksempel på highlight (kan legges til innenfor <svg> taggen, etter den første <path>):
      <path
        d="M9.5 7.5L16.5 12L9.5 16.5V7.5Z" // En litt mindre, innfelt sti
        fill="rgba(255, 255, 255, 0.35)" // Halvgjennomsiktig hvit
        strokeLinejoin="round"
      />
    */}
  </svg>
);

export default PlayIcon;
