"use client";

import React, { useState } from "react";
import Link from "next/link";

interface StyledButtonProps extends React.PropsWithChildren {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  as?: "button" | "a";
  disabled?: boolean; // <--- Lagt til disabled prop her
}

const StyledButton: React.FC<StyledButtonProps> = ({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
  as = href ? "a" : "button",
  disabled = false, // <--- Standardverdi for disabled
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = `
    py-[10px] px-[20px] rounded-xl font-bold inline-flex items-center justify-center
    uppercase tracking-[0.5px] transition-transform transition-shadow duration-[80ms]
    ease-out text-base leading-normal min-w-[180px]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  `;

  const variantStyles = {
    primary: {
      bg: "bg-[var(--button-primary-bg)]",
      text: "text-[var(--button-primary-text)]",
      border: "border-[3px] border-[var(--button-primary-border)]",
      ringFocus: "focus-visible:ring-[var(--button-primary-border)]",
      shadowBase:
        "shadow-[0px_6px_0px_var(--button-primary-border),_2px_8px_10px_var(--button-primary-shadow-color)]",
      shadowPressed:
        "shadow-[0px_2px_0px_var(--button-primary-border),_1px_3px_5px_var(--button-primary-shadow-color)]",
    },
    secondary: {
      bg: "bg-[var(--button-secondary-bg)]",
      text: "text-[var(--button-secondary-text)]",
      ringFocus: "focus-visible:ring-[var(--button-secondary-border)]",
      border: "border-[3px] border-[var(--button-secondary-border)]",
      shadowBase:
        "shadow-[0px_6px_0px_var(--button-secondary-border),_2px_8px_10px_var(--button-secondary-shadow-color)]",
      shadowPressed:
        "shadow-[0px_2px_0px_var(--button-secondary-border),_1px_3px_5px_var(--button-secondary-shadow-color)]",
    },
  };

  const currentVariant = variantStyles[variant];

  const combinedClasses = `
    ${baseClasses}
    ${currentVariant.bg}
    ${currentVariant.text}
    ${currentVariant.border}
    ${currentVariant.ringFocus}
    ${
      isPressed && !disabled
        ? currentVariant.shadowPressed
        : currentVariant.shadowBase
    }
    ${isPressed && !disabled ? "translate-y-1" : "translate-y-0"}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const handleMouseDown = () => {
    if (disabled) return;
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    if (disabled) return;
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    if (isPressed) {
      setIsPressed(false);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (disabled) return;
    if (isPressed && document.activeElement !== e.currentTarget) {
      setIsPressed(false);
    }
  };

  if (as === "a" && href) {
    // For Link/<a>, 'disabled' er ikke et gyldig HTML-attributt.
    // Vi håndterer deaktivert utseende og oppførsel via CSS (opacity, cursor-not-allowed)
    // og ved å forhindre onClick-hendelsen hvis 'disabled' er true.
    const handleClickForLink = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        e.preventDefault(); // Forhindrer navigasjon for deaktivert lenke
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Link
        href={disabled ? "#" : href} // Kan sette href til # for å unngå navigasjon, eller la den være
        className={combinedClasses}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={() => {
          if (!disabled) setIsPressed(false);
        }}
        onClick={handleClickForLink}
        aria-disabled={disabled} // Viktig for tilgjengelighet
        tabIndex={disabled ? -1 : undefined} // Fjern fra tab-rekkefølge hvis deaktivert
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={() => {
        if (!disabled) setIsPressed(false);
      }}
      onClick={onClick}
      disabled={disabled} // <--- disabled-attributtet sendes videre til <button>
    >
      {children}
    </button>
  );
};

export default StyledButton;
