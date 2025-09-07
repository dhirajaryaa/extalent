import React from "react";
import LogoImg from "@/assets/extalent_logo.svg?react";
function Logo({ variant = "default" }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <LogoImg className="size-8 sm:size-10" />
      {variant === "default" && (
        <span className="font-bold text-xl sm:text-2xl">ExTalent</span>
      )}
    </div>
  );
}

export default Logo;
