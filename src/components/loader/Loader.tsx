import { useTheme } from "next-themes";
import React from "react";
import { ThreeDot } from "react-loading-indicators";

const Loader = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex   justify-center items-center h-screen w-full">
      <ThreeDot
        variant="pulsate"
        color={`${resolvedTheme === "dark" ? "#e3e6e8" : "#030712"}`}
        size="medium"
        text=""
        textColor=""
      />
    </div>
  );
};

export default Loader;
