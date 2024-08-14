// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */
import React from "react";
import { classNames } from "@plasmicapp/react-web";

export type IconIconProps = React.ComponentProps<"svg"> & {
  title?: string;
};

export function IconIcon(props: IconIconProps) {
  const { className, style, title, ...restProps } = props;
  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"currentColor"}
      viewBox={"0 0 36 36"}
      version={"1.1"}
      preserveAspectRatio={"xMidYMid meet"}
      height={"1em"}
      className={classNames("plasmic-default__svg", className)}
      style={style}
      {...restProps}
    >
      {title && <title>{title}</title>}

      <path
        className={"clr-i-outline clr-i-outline-path-1"}
        d={
          "M18 6.72a5.73 5.73 0 105.73 5.73A5.73 5.73 0 0018 6.72zm0 9.46a3.73 3.73 0 113.73-3.73A3.73 3.73 0 0118 16.17z"
        }
      ></path>

      <path
        className={"clr-i-outline clr-i-outline-path-2"}
        d={
          "M18 2A11.79 11.79 0 006.22 13.73c0 4.67 2.62 8.58 4.54 11.43l.35.52a99.61 99.61 0 006.14 8l.76.89.76-.89a99.82 99.82 0 006.14-8l.35-.53c1.91-2.85 4.53-6.75 4.53-11.42A11.79 11.79 0 0018 2zm5.59 22l-.36.53c-1.72 2.58-4 5.47-5.23 6.9-1.18-1.43-3.51-4.32-5.23-6.9l-.35-.53c-1.77-2.64-4.2-6.25-4.2-10.31a9.78 9.78 0 1119.56 0c0 4.1-2.42 7.71-4.19 10.31z"
        }
      ></path>

      <path fill={"none"} d={"M0 0h36v36H0z"}></path>
    </svg>
  );
}

export default IconIcon;
/* prettier-ignore-end */
