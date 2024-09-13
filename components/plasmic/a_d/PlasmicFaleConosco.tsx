// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: v9K2EjBMfgxWsQ5xC6ATsB
// Component: i1x7Xze2vbS-

import * as React from "react";

import Head from "next/head";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

import {
  Flex as Flex__,
  MultiChoiceArg,
  PlasmicDataSourceContextProvider as PlasmicDataSourceContextProvider__,
  PlasmicIcon as PlasmicIcon__,
  PlasmicImg as PlasmicImg__,
  PlasmicLink as PlasmicLink__,
  PlasmicPageGuard as PlasmicPageGuard__,
  SingleBooleanChoiceArg,
  SingleChoiceArg,
  Stack as Stack__,
  StrictProps,
  Trans as Trans__,
  classNames,
  createPlasmicElementProxy,
  deriveRenderOpts,
  ensureGlobalVariants,
  generateOnMutateForSpec,
  generateStateOnChangeProp,
  generateStateOnChangePropForCodeComponents,
  generateStateValueProp,
  get as $stateGet,
  hasVariant,
  initializeCodeComponentStates,
  initializePlasmicStates,
  makeFragment,
  omit,
  pick,
  renderPlasmicSlot,
  set as $stateSet,
  useCurrentUser,
  useDollarState,
  usePlasmicTranslator,
  useTrigger,
  wrapWithClassName
} from "@plasmicapp/react-web";
import {
  DataCtxReader as DataCtxReader__,
  useDataEnv,
  useGlobalActions
} from "@plasmicapp/react-web/lib/host";

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_copy_of_plasmic_kit_q_4_color_tokens_css from "../imported_dep_5/plasmic.module.css"; // plasmic-import: 49wF7zG85s5BmUvuzSq52Y/projectcss
import plasmic_plasmic_kit_q_4_color_tokens_css from "../imported_dep_4/plasmic.module.css"; // plasmic-import: hPAx2Po3YSE2fzFsJw5Trv/projectcss
import projectcss from "./plasmic.module.css"; // plasmic-import: v9K2EjBMfgxWsQ5xC6ATsB/projectcss
import sty from "./PlasmicFaleConosco.module.css"; // plasmic-import: i1x7Xze2vbS-/css

createPlasmicElementProxy;

export type PlasmicFaleConosco__VariantMembers = {};
export type PlasmicFaleConosco__VariantsArgs = {};
type VariantPropType = keyof PlasmicFaleConosco__VariantsArgs;
export const PlasmicFaleConosco__VariantProps = new Array<VariantPropType>();

export type PlasmicFaleConosco__ArgsType = {};
type ArgPropType = keyof PlasmicFaleConosco__ArgsType;
export const PlasmicFaleConosco__ArgProps = new Array<ArgPropType>();

export type PlasmicFaleConosco__OverridesType = {
  root?: Flex__<"div">;
  link?: Flex__<"a"> & Partial<LinkProps>;
  img?: Flex__<typeof PlasmicImg__>;
};

export interface DefaultFaleConoscoProps {
  className?: string;
}

const $$ = {};

function useNextRouter() {
  try {
    return useRouter();
  } catch {}
  return undefined;
}

function PlasmicFaleConosco__RenderFunc(props: {
  variants: PlasmicFaleConosco__VariantsArgs;
  args: PlasmicFaleConosco__ArgsType;
  overrides: PlasmicFaleConosco__OverridesType;
  forNode?: string;
}) {
  const { variants, overrides, forNode } = props;

  const args = React.useMemo(
    () =>
      Object.assign(
        {},
        Object.fromEntries(
          Object.entries(props.args).filter(([_, v]) => v !== undefined)
        )
      ),
    [props.args]
  );

  const $props = {
    ...args,
    ...variants
  };

  const __nextRouter = useNextRouter();
  const $ctx = useDataEnv?.() || {};
  const refsRef = React.useRef({});
  const $refs = refsRef.current;

  return (
    <Stack__
      as={"div"}
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
      hasGap={true}
      className={classNames(
        projectcss.all,
        projectcss.root_reset,
        projectcss.plasmic_default_styles,
        projectcss.plasmic_mixins,
        projectcss.plasmic_tokens,
        plasmic_copy_of_plasmic_kit_q_4_color_tokens_css.plasmic_tokens,
        plasmic_plasmic_kit_q_4_color_tokens_css.plasmic_tokens,
        sty.root
      )}
    >
      <div
        className={classNames(
          projectcss.all,
          projectcss.__wab_text,
          sty.text__dorPq
        )}
      >
        {"Ficou com alguma d\u00favida?"}
      </div>
      <Stack__
        as={PlasmicLink__}
        data-plasmic-name={"link"}
        data-plasmic-override={overrides.link}
        hasGap={true}
        className={classNames(projectcss.all, projectcss.a, sty.link)}
        component={Link}
        href={"https://wa.me/+5513991259404"}
        platform={"nextjs"}
      >
        <PlasmicImg__
          data-plasmic-name={"img"}
          data-plasmic-override={overrides.img}
          alt={""}
          className={classNames(sty.img)}
          displayHeight={"50px"}
          displayMaxHeight={"none"}
          displayMaxWidth={"100%"}
          displayMinHeight={"0"}
          displayMinWidth={"0"}
          displayWidth={"50px"}
          loading={"lazy"}
          src={{
            src: "/plasmic/a_d/images/image6.png",
            fullWidth: 600,
            fullHeight: 383,
            aspectRatio: undefined
          }}
        />

        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text___6N1PX
          )}
        >
          {"FALE CONOSCO"}
        </div>
      </Stack__>
    </Stack__>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "link", "img"],
  link: ["link", "img"],
  img: ["img"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  link: "a";
  img: typeof PlasmicImg__;
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicFaleConosco__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicFaleConosco__VariantsArgs;
    args?: PlasmicFaleConosco__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicFaleConosco__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicFaleConosco__ArgsType,
      ReservedPropsType
    > &
    /* Specify overrides for each element directly as props*/ Omit<
      NodeOverridesType<T>,
      ReservedPropsType | VariantPropType | ArgPropType
    > &
    /* Specify props for the root element*/ Omit<
      Partial<React.ComponentProps<NodeDefaultElementType[T]>>,
      ReservedPropsType | VariantPropType | ArgPropType | DescendantsType<T>
    >;

function makeNodeComponent<NodeName extends NodeNameType>(nodeName: NodeName) {
  type PropsType = NodeComponentProps<NodeName> & { key?: React.Key };
  const func = function <T extends PropsType>(
    props: T & StrictProps<T, PropsType>
  ) {
    const { variants, args, overrides } = React.useMemo(
      () =>
        deriveRenderOpts(props, {
          name: nodeName,
          descendantNames: PlasmicDescendants[nodeName],
          internalArgPropNames: PlasmicFaleConosco__ArgProps,
          internalVariantPropNames: PlasmicFaleConosco__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicFaleConosco__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicFaleConosco";
  } else {
    func.displayName = `PlasmicFaleConosco.${nodeName}`;
  }
  return func;
}

export const PlasmicFaleConosco = Object.assign(
  // Top-level PlasmicFaleConosco renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    link: makeNodeComponent("link"),
    img: makeNodeComponent("img"),

    // Metadata about props expected for PlasmicFaleConosco
    internalVariantProps: PlasmicFaleConosco__VariantProps,
    internalArgProps: PlasmicFaleConosco__ArgProps
  }
);

export default PlasmicFaleConosco;
/* prettier-ignore-end */
