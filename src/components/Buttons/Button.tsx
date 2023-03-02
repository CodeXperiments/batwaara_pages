import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from "@mantine/core";
import { ComponentPropsWithoutRef } from "react";

interface ButtonProps
  extends MantineButtonProps,
  Omit<ComponentPropsWithoutRef<"button">, "color"> {
  text: string;
}

const Button = (props: ButtonProps) => {
  const {
    text,
    variant = "outline",
    color = "cyan",
    size = "md",
    radius = "md",
  } = props;

  return (
    <MantineButton
      {...props}
      variant={variant}
      color={color}
      size={size}
      radius={radius}
    >
      {text}
    </MantineButton>
  );
};

export default Button;
