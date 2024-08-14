// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

import * as React from "react";
import { createUseScreenVariants } from "@plasmicapp/react-web";

export type ScreenValue = "tablet" | "desktop" | "bigDesktop";
export const ScreenContext = React.createContext<ScreenValue[] | undefined>(
  "PLEASE_RENDER_INSIDE_PROVIDER" as any
);

export const useScreenVariants = createUseScreenVariants(true, {
  tablet: "(min-width:600px)",
  desktop: "(min-width:1000px)",
  bigDesktop: "(min-width:1200px)",
});

export default ScreenContext;
/* prettier-ignore-end */
