import { forwardRef, MouseEventHandler, useContext } from 'react';
import { CONTAINER_STYLES, TEXT_STYLES } from '../../styles/list';
import { Base } from '../Base';
import { useHover } from '@react-aria/interactions';
import { useFocus } from '../../utils/interactions';
import { useButton } from '@react-aria/button';
import { mergeProps } from '@react-aria/utils';
import { extractStyles } from '../../utils/styles';
import { filterBaseProps } from '../../utils/filterBaseProps';
import { UIKitContext } from '../../provider';
import {
  BaseProps,
  BaseStyleProps,
  ContainerStyleProps,
  TagNameProps,
  TextStyleProps,
} from '../types';
import { AriaButtonProps } from '@react-types/button';
import { Styles } from '../../styles/types';
import { useFocusableRef } from '@react-spectrum/utils';
import { FocusableRef } from '@react-types/shared';

export interface CubeActionProps
  extends BaseProps,
    TagNameProps,
    BaseStyleProps,
    ContainerStyleProps,
    TextStyleProps,
    Omit<AriaButtonProps, 'type'> {
  to?: string;
  label?: string;
  preventDefault?: boolean;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  allowNativeEvents?: boolean;
}

const FILTER_OPTIONS = { propNames: new Set(['onMouseEnter', 'onMouseLeave']) };

/**
 * Helper to open link.
 * @param {String} href
 * @param {String|Boolean} [target]
 */
export function openLink(href, target?) {
  const link = document.createElement('a');

  link.href = href;

  if (target) {
    link.target = target === true ? '_blank' : target;
  }

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export function parseTo(to): {
  newTab: boolean;
  nativeRoute: boolean;
  href: string | undefined;
} {
  const newTab = to && typeof to === 'string' && to.startsWith('!');
  const nativeRoute = to && typeof to === 'string' && to.startsWith('@');
  const href: string | undefined
    = to && typeof to === 'string'
      ? newTab || nativeRoute
        ? to.slice(1)
        : to
      : undefined;

  return {
    newTab,
    nativeRoute,
    href,
  };
}

export function createLinkClickHandler(router, to, onPress, disabled) {
  const { newTab, nativeRoute, href } = parseTo(to);

  return function onClickHandler(evt) {
    if (disabled) return;

    if (!to) return;

    if (evt.shiftKey || evt.metaKey || newTab) {
      openLink(href, true);

      return;
    }

    if (nativeRoute) {
      openLink(href || window.location.href);
    } else if (href && href.startsWith('#')) {
      const id = href.slice(1);
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });

        return;
      }
    }

    if (router) {
      router.push(href);
    } else if (href) {
      window.location.href = href;
    }
  };
}

const DEFAULT_STYLES: Styles = {
  reset: 'button',
  position: 'relative',
  margin: 0,
  fontFamily: 'var(--font)',
  fontWeight: 'inherit',
  border: 0,
  padding: 0,
  outline: {
    '': '#purple-03.0',
    focused: '#purple-03',
  },
  transition: 'theme',
  cursor: 'pointer',
} as const;

const STYLE_PROPS = [...CONTAINER_STYLES, ...TEXT_STYLES];

export const Action = forwardRef(
  (
    {
      to,
      as,
      htmlType,
      label,
      theme,
      preventDefault,
      css,
      mods,
      ...props
    }: CubeActionProps,
    ref: FocusableRef<HTMLElement>,
  ) => {
    if (
      (props.onClick
        || props.onMouseEnter
        || props.onMouseLeave
        || props.onBlur
        || props.onFocus
        || props.onKeyDown
        || props.onKeyUp)
      && !props.allowNativeEvents
    ) {
      throw new Error(
        'CubeUIKit: add `allowNativeEvents` property to the `Action` component to allow usage of native events like `onClick`.',
      );
    }

    as = to ? 'a' : as || 'button';

    const router = useContext(UIKitContext).router;
    const isDisabled = props.isDisabled;
    const { newTab, href } = parseTo(to);
    const target = newTab ? '_blank' : undefined;
    const pressHandler = createLinkClickHandler(
      router,
      to,
      props.onPress,
      isDisabled,
    );
    const domRef = useFocusableRef(ref);
    const styles = extractStyles(props, STYLE_PROPS, DEFAULT_STYLES);

    let { buttonProps, isPressed } = useButton(props, domRef);
    let { hoverProps, isHovered } = useHover({ isDisabled });
    let { focusProps, isFocused } = useFocus({ isDisabled }, true);

    const customProps: {
      onClick?: MouseEventHandler;
    } = {};

    // prevent default behavior for links
    if (to) {
      customProps.onClick = (evt) => {
        evt.preventDefault();

        if (isDisabled) return;

        pressHandler(evt);
      };
    }

    return (
      <Base
        mods={{
          hovered: isHovered && !isDisabled,
          pressed: isPressed && !isDisabled,
          focused: isFocused && !isDisabled,
          disabled: isDisabled,
          ...mods,
        }}
        aria-label={label}
        data-theme={theme}
        {...mergeProps(
          buttonProps,
          hoverProps,
          focusProps,
          customProps,
          filterBaseProps(props, FILTER_OPTIONS),
        )}
        type={htmlType || 'button'}
        rel={as === 'a' && newTab ? 'rel="noopener noreferrer"' : undefined}
        ref={domRef}
        as={as}
        isDisabled={isDisabled}
        styles={styles}
        target={target}
        href={href}
        css={css}
      />
    );
  },
);
