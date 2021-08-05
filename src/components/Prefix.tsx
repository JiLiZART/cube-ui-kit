import { CSSProperties, forwardRef, useEffect } from 'react';
import { Base } from './Base';
import { CONTAINER_STYLES } from '../styles/list';
import { extractStyles, parseStyle } from '../utils/styles';
import { filterBaseProps } from '../utils/filterBaseProps';
import { useCombinedRefs } from '../utils/react';
import { BaseProps, ContainerStyleProps } from './types';
import { NuStyles } from '../styles/types';

const DEFAULT_STYLES: NuStyles = {
  display: 'grid',
  position: 'absolute',
  placeItems: 'center',
  gap: 0,
  left: '@prefix-gap',
  top: '@prefix-gap',
  bottom: '@prefix-gap',
  color: '#dark.75',
  height: '(100% - (2 * @prefix-gap))',
};

export interface CubePrefixProps extends BaseProps, ContainerStyleProps {
  onWidthChange?: Function;
  outerGap?: CSSProperties['gap'];
}

export const Prefix = forwardRef((allProps: CubePrefixProps, outerRef) => {
  let { onWidthChange, outerGap = '1bw', children, ...props } = allProps;

  const styles = extractStyles(props, CONTAINER_STYLES, DEFAULT_STYLES);
  const ref = useCombinedRefs(outerRef);

  useEffect(() => {
    if (ref?.current && onWidthChange) {
      onWidthChange(ref.current.offsetWidth);
    }
  }, [children, ref, onWidthChange]);

  return (
    <Base
      {...filterBaseProps(props, { eventProps: true })}
      styles={styles}
      ref={ref}
      style={{
        // @ts-ignore
        '--prefix-gap': parseStyle(outerGap).value,
      }}
    >
      {children}
    </Base>
  );
});
