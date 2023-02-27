import {
  Loader as MantineLoader,
  LoaderProps as MantineLoaderProps,
} from "@mantine/core";
import { FC } from "react";

const Loader: FC<MantineLoaderProps> = (props) => {
  const { variant = "bars" } = props;

  return (
    <div className="flex w-full justify-center">
      <MantineLoader variant={variant} {...props} />
    </div>
  );
};

export default Loader;
