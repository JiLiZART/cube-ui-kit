import { forwardRef } from 'react';
import { Text, CubeTextProps } from './Text';
import {
  BASE_STYLES,
  BLOCK_STYLES,
  COLOR_STYLES,
  POSITION_STYLES,
  TEXT_STYLES,
} from '../styles/list';
import { extractStyles, NuResponsiveStyleValue } from '../utils/styles';
import { filterBaseProps } from '../utils/filterBaseProps';
import { useSlotProps } from '../utils/react';
import { BlockStyleProps, PositionStyleProps } from './types';

const DEFAULT_STYLES = {
  gridArea: 'heading',
  display: 'block',
  color: '#dark',
};

const STYLE_LIST = [
  ...BASE_STYLES,
  ...TEXT_STYLES,
  ...BLOCK_STYLES,
  ...COLOR_STYLES,
  ...POSITION_STYLES,
];

const PROP_MAP = {
  align: 'textAlign',
  transform: 'textTransform',
  weight: 'fontWeight',
  italic: 'fontStyle',
} as const;

export interface CubeTitleProps
  extends CubeTextProps,
    BlockStyleProps,
    PositionStyleProps {
  /** The level of the heading **/
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  /** The size style for the heading **/
  size?: NuResponsiveStyleValue<
    'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | string
  >;
}

function getFontWeight(level, size) {
  return (level || 1) === 1 && (!size || size === 'h1') ? 700 : 600;
}

const _Title = forwardRef(
  ({ qa, as, level, ...props }: CubeTitleProps, ref) => {
    props = useSlotProps(props, 'heading');

    let cachedSize;
    const tag = `h${level || 1}`;
    const styles = extractStyles(
      props,
      STYLE_LIST,
      {
        ...DEFAULT_STYLES,
        size: tag,
        fontWeight: Array.isArray(props.size)
          ? props.size.map((size) => {
              if (size == null) size = cachedSize;

              cachedSize = size;

              return getFontWeight(level, size);
            })
          : getFontWeight(level, props.size),
      },
      PROP_MAP,
    );

    return (
      <Text
        qa={qa || 'Title'}
        as={as || tag}
        {...filterBaseProps(props, { eventProps: true })}
        styles={styles}
        ref={ref}
      />
    );
  },
);

const Title = Object.assign(_Title, {
  Danger: function DangerTitle(props) {
    return <Title color="#danger-text" {...props} />;
  },
  Success: function SuccessTitle(props) {
    return <Title color="#success-text" {...props} />;
  },
});

export { Title };
