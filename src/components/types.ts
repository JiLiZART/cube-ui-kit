import {
  AllHTMLAttributes,
  CSSProperties,
  JSXElementConstructor,
  ReactElement,
  ReactNodeArray,
  ReactPortal,
} from 'react';
import { NuStyles } from '../styles/types';
import {
  BASE_STYLES,
  BLOCK_STYLES,
  COLOR_STYLES,
  CONTAINER_STYLES,
  DIMENSION_STYLES,
  FLOW_STYLES,
  OUTER_STYLES,
  POSITION_STYLES,
  TEXT_STYLES,
} from '../styles/list';

export interface BasePropsWithoutChildren
  extends Pick<AllHTMLAttributes<HTMLElement>, 'className' | 'role' | 'id'> {
  /** QA ID for e2e testing **/
  qa?: string;
  /** QA value for e2e testing **/
  qaVal?: string | number;
  /** The tag name of the element **/
  // as?: string;
  /** The style map **/
  styles?: NuStyles;
  /** The list of responsive points in pixels **/
  breakpoints?: number[];
  /** Whether the element has the block layout outside **/
  block?: boolean;
  /** Whether the element has the inline layout outside **/
  inline?: boolean;
  /** The list of element modifiers **/
  mods?: { [key: string]: boolean | undefined | null };
  /** Whether the element is hidden (`hidden` attribute is set) **/
  isHidden?: boolean;
  /** DEPRECATED: Whether the element is hidden (`hidden` attribute is set) **/
  hidden?: boolean;
  /** Whether the element is disabled (`disabled` attribute is set) **/
  isDisabled?: boolean;
  /** DEPRECATED: Whether the element is disabled (`disabled` attribute is set) **/
  disabled?: boolean;
  /** Plain css for the element **/
  css?: string;
  /** The CSS style map */
  style?:
    | CSSProperties
    | (CSSProperties & { [key: string]: string | number | null });
}

export interface BaseProps extends BasePropsWithoutChildren {
  children?:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | string
    | number
    | {}
    | ReactNodeArray
    | ReactPortal
    | boolean
    | null
    | undefined;
}

export interface AllBaseProps<K extends keyof HTMLElementTagNameMap = 'div'>
  extends BaseProps,
    Omit<AllHTMLAttributes<HTMLElementTagNameMap[K]>, 'style'> {
  as?: K;
}

export type BaseStyleProps = Pick<NuStyles, typeof BASE_STYLES[number]>;
export type PositionStyleProps = Pick<NuStyles, typeof POSITION_STYLES[number]>;
export type BlockStyleProps = Pick<NuStyles, typeof BLOCK_STYLES[number]>;
export type ColorStyleProps = Pick<NuStyles, typeof COLOR_STYLES[number]>;
export type TextStyleProps = Pick<NuStyles, typeof TEXT_STYLES[number]>;
export type DimensionStyleProps = Pick<
  NuStyles,
  typeof DIMENSION_STYLES[number]
>;
export type FlowStyleProps = Pick<NuStyles, typeof FLOW_STYLES[number]>;
export type ContainerStyleProps = Pick<
  NuStyles,
  typeof CONTAINER_STYLES[number]
>;
export type OuterStyleProps = Pick<NuStyles, typeof OUTER_STYLES[number]>;
export type ShortItemsStyles = {
  align?: NuStyles['alignItems'];
  justify?: NuStyles['justifyItems'];
};

export type ShortGridStyles = {
  template?: NuStyles['gridTemplate'];
  columns?: NuStyles['gridColumns'];
  rows?: NuStyles['gridRows'];
  areas?: NuStyles['gridAreas'];
};

export interface Props {
  [key: string]: any;
}

export type TagName = keyof HTMLElementTagNameMap;

export interface TagNameProps {
  as?: TagName;
}
