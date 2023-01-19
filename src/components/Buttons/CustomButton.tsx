import { Button, MantineColor, MantineGradient } from "@mantine/core";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  text: string;
  variant?:
    | "outline"
    | "white"
    | "light"
    | "default"
    | "filled"
    | "subtle"
    | "gradient";
  color?: MantineColor;
  isDisabled?: boolean;
  gradient?: MantineGradient;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loaderPosition?: "left" | "right" | "center";
  isLoading?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  type?: "button" | "reset" | "submit";
  isUppercase?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  radius?: number | "xs" | "sm" | "md" | "lg" | "xl";
  isFullWidth?: boolean;
  className?: string;
}

const CustomButton: React.FC<ButtonProps> = (props) => {
  const {
    text,
    variant = "outline",
    color = "cyan",
    isDisabled = false,
    gradient,
    leftIcon,
    rightIcon,
    loaderPosition,
    isLoading,
    size = "md",
    type,
    isUppercase,
    onClick,
    radius = "md",
    isFullWidth = false,
    className,
  } = props;

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      uppercase={isUppercase}
      disabled={isDisabled}
      gradient={gradient}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      loaderPosition={loaderPosition}
      loading={isLoading}
      type={type}
      onClick={onClick}
      radius={radius}
      fullWidth={isFullWidth}
      className={className}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
