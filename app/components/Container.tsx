import { classNames } from "@/app/utils/appearance";
import { ReactNode, type JSX } from "react";

type ContainerProps = {
  children: ReactNode;
  element?: keyof JSX.IntrinsicElements;
  classes?: { container?: string };
  size?: string;
};

type SizeMapProps = {
  [key: string]: string;
};

export default function Container({
  children,
  element: Tag = "div",
  classes,
  size = "lg",
}: ContainerProps) {
  const sizeMap: SizeMapProps = {
    xs: "max-w-md",
    sm: "max-w-xl",
    md: "max-w-6xl",
    lg: "max-w-7xl",
  };

  const className = classNames(
    "mx-auto p-4",
    sizeMap[size],
    classes?.container
  );

  return <Tag className={className}>{children}</Tag>;
}
