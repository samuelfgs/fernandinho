// @ts-nocheck
/* eslint-disable */
/* tslint:disable */
/* prettier-ignore-start */

/** @jsxRuntime classic */
/** @jsx createPlasmicElementProxy */
/** @jsxFrag React.Fragment */

// This class is auto-generated by Plasmic; please do not edit!
// Plasmic Project: v9K2EjBMfgxWsQ5xC6ATsB
// Component: FanTsC9TsYHD

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

import Button from "../../Button"; // plasmic-import: IcxtRwsLDNXC/component

import "@plasmicapp/react-web/lib/plasmic.css";

import plasmic_copy_of_plasmic_kit_q_4_color_tokens_css from "../imported_dep_5/plasmic.module.css"; // plasmic-import: 49wF7zG85s5BmUvuzSq52Y/projectcss
import plasmic_plasmic_kit_q_4_color_tokens_css from "../imported_dep_4/plasmic.module.css"; // plasmic-import: hPAx2Po3YSE2fzFsJw5Trv/projectcss
import projectcss from "./plasmic.module.css"; // plasmic-import: v9K2EjBMfgxWsQ5xC6ATsB/projectcss
import sty from "./PlasmicHomeDesktopPage3.module.css"; // plasmic-import: FanTsC9TsYHD/css

import Icon3Icon from "./icons/PlasmicIcon__Icon3"; // plasmic-import: sA_PcaHKQ0gG/icon
import Icon4Icon from "./icons/PlasmicIcon__Icon4"; // plasmic-import: -GsD1lPQfgan/icon

createPlasmicElementProxy;

export type PlasmicHomeDesktopPage3__VariantMembers = {};
export type PlasmicHomeDesktopPage3__VariantsArgs = {};
type VariantPropType = keyof PlasmicHomeDesktopPage3__VariantsArgs;
export const PlasmicHomeDesktopPage3__VariantProps =
  new Array<VariantPropType>();

export type PlasmicHomeDesktopPage3__ArgsType = {};
type ArgPropType = keyof PlasmicHomeDesktopPage3__ArgsType;
export const PlasmicHomeDesktopPage3__ArgProps = new Array<ArgPropType>();

export type PlasmicHomeDesktopPage3__OverridesType = {
  root?: Flex__<"div">;
  img?: Flex__<typeof PlasmicImg__>;
  button?: Flex__<typeof Button>;
  span?: Flex__<"span">;
};

export interface DefaultHomeDesktopPage3Props {
  className?: string;
}

const $$ = {};

function useNextRouter() {
  try {
    return useRouter();
  } catch {}
  return undefined;
}

function PlasmicHomeDesktopPage3__RenderFunc(props: {
  variants: PlasmicHomeDesktopPage3__VariantsArgs;
  args: PlasmicHomeDesktopPage3__ArgsType;
  overrides: PlasmicHomeDesktopPage3__OverridesType;
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
    <div
      data-plasmic-name={"root"}
      data-plasmic-override={overrides.root}
      data-plasmic-root={true}
      data-plasmic-for-node={forNode}
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
        className={classNames(projectcss.all, sty.freeBox__qmVrr)}
        id={"ingressos"}
      >
        <div
          className={classNames(
            projectcss.all,
            projectcss.__wab_text,
            sty.text___6NU3C
          )}
        >
          {"INGRESSOS"}
        </div>
        <div className={classNames(projectcss.all, sty.freeBox__rmAfn)}>
          <PlasmicImg__
            data-plasmic-name={"img"}
            data-plasmic-override={overrides.img}
            alt={""}
            className={classNames(sty.img)}
            displayHeight={"auto"}
            displayMaxHeight={"80%"}
            displayMaxWidth={"700px"}
            displayMinHeight={"0"}
            displayMinWidth={"0"}
            displayWidth={"80%"}
            loading={"lazy"}
            src={{
              src: "/plasmic/a_d/images/image4.jpg",
              fullWidth: 934,
              fullHeight: 432,
              aspectRatio: undefined
            }}
          />
        </div>
        <Stack__
          as={"div"}
          hasGap={true}
          className={classNames(projectcss.all, sty.freeBox___2XFmh)}
        >
          <Button
            data-plasmic-name={"button"}
            data-plasmic-override={overrides.button}
            className={classNames("__wab_instance", sty.button)}
            color={"yellow"}
            link={`/inscricao`}
            shape={"sharp"}
          >
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text___5FBmq
              )}
            >
              {"INSCREVA-SE"}
            </div>
          </Button>
          <div className={classNames(projectcss.all, sty.freeBox__gqH0T)}>
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__wfCk3
              )}
            >
              {"2\u00ba LOTE"}
            </div>
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text__u586K
              )}
            >
              {"PISTA VIP: ESGOTADO"}
            </div>
            <div
              className={classNames(
                projectcss.all,
                projectcss.__wab_text,
                sty.text___6GDAc
              )}
            >
              <React.Fragment>
                <React.Fragment>{"PISTA GERAL: "}</React.Fragment>
                {
                  <span
                    data-plasmic-name={"span"}
                    data-plasmic-override={overrides.span}
                    className={classNames(
                      projectcss.all,
                      projectcss.span,
                      projectcss.__wab_text,
                      projectcss.plasmic_default__inline,
                      sty.span
                    )}
                  >
                    {"R$ 140,00"}
                  </span>
                }
                <React.Fragment>{" R$ 70,00"}</React.Fragment>
              </React.Fragment>
            </div>
          </div>
        </Stack__>
      </div>
    </div>
  ) as React.ReactElement | null;
}

const PlasmicDescendants = {
  root: ["root", "img", "button", "span"],
  img: ["img"],
  button: ["button"],
  span: ["span"]
} as const;
type NodeNameType = keyof typeof PlasmicDescendants;
type DescendantsType<T extends NodeNameType> =
  (typeof PlasmicDescendants)[T][number];
type NodeDefaultElementType = {
  root: "div";
  img: typeof PlasmicImg__;
  button: typeof Button;
  span: "span";
};

type ReservedPropsType = "variants" | "args" | "overrides";
type NodeOverridesType<T extends NodeNameType> = Pick<
  PlasmicHomeDesktopPage3__OverridesType,
  DescendantsType<T>
>;
type NodeComponentProps<T extends NodeNameType> =
  // Explicitly specify variants, args, and overrides as objects
  {
    variants?: PlasmicHomeDesktopPage3__VariantsArgs;
    args?: PlasmicHomeDesktopPage3__ArgsType;
    overrides?: NodeOverridesType<T>;
  } & Omit<PlasmicHomeDesktopPage3__VariantsArgs, ReservedPropsType> & // Specify variants directly as props
    /* Specify args directly as props*/ Omit<
      PlasmicHomeDesktopPage3__ArgsType,
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
          internalArgPropNames: PlasmicHomeDesktopPage3__ArgProps,
          internalVariantPropNames: PlasmicHomeDesktopPage3__VariantProps
        }),
      [props, nodeName]
    );
    return PlasmicHomeDesktopPage3__RenderFunc({
      variants,
      args,
      overrides,
      forNode: nodeName
    });
  };
  if (nodeName === "root") {
    func.displayName = "PlasmicHomeDesktopPage3";
  } else {
    func.displayName = `PlasmicHomeDesktopPage3.${nodeName}`;
  }
  return func;
}

export const PlasmicHomeDesktopPage3 = Object.assign(
  // Top-level PlasmicHomeDesktopPage3 renders the root element
  makeNodeComponent("root"),
  {
    // Helper components rendering sub-elements
    img: makeNodeComponent("img"),
    button: makeNodeComponent("button"),
    span: makeNodeComponent("span"),

    // Metadata about props expected for PlasmicHomeDesktopPage3
    internalVariantProps: PlasmicHomeDesktopPage3__VariantProps,
    internalArgProps: PlasmicHomeDesktopPage3__ArgProps
  }
);

export default PlasmicHomeDesktopPage3;
/* prettier-ignore-end */
