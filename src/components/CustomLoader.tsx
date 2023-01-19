import { Loader, MantineColor } from "@mantine/core";
import React from "react";

interface LoaderProps {
  color?: MantineColor;
  size?: number | "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "bars" | "oval" | "dots";
  className?: string;
}

const CustomLoader: React.FC<LoaderProps> = (props) => {
  const { color, size, variant = "bars", className } = props;

  return (
    <div className="flex w-full justify-center">
      <Loader
        color={color}
        size={size}
        variant={variant}
        className={className}
      />
    </div>
  );
};

export default CustomLoader;
