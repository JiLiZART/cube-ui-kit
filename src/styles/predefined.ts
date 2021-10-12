import { gapStyle } from './gap';
import { flowStyle } from './flow';
import { resetStyle } from './reset';
import { colorStyle } from './color';
import { fillStyle } from './fill';
import { widthStyle } from './width';
import { heightStyle } from './height';
import { radiusStyle } from './radius';
import { borderStyle } from './border';
import { shadowStyle } from './shadow';
import { paddingStyle } from './padding';
import { presetStyle } from './preset';
import { fontStyleStyle } from './fontStyle';
import { marginStyle } from './margin';
import { fontStyle } from './font';
import { outlineStyle } from './outline';
import { transitionStyle } from './transition';
import { groupRadiusAttr } from './groupRadius';
import { boxShadowCombinator } from './boxShadow.combinator';
import { styledScrollbarStyle } from './styledScrollbar';
import { displayStyle } from './display';
import { defineCustomStyle, defineStyleAlias } from './index';

const columnsConverter = (val) => {
  if (typeof val === 'number') {
    return 'minmax(1px, 1fr) '.repeat(val).trim();
  }

  return;
};
const rowsConverter = (val) => {
  if (typeof val === 'number') {
    return 'auto '.repeat(val).trim();
  }

  return;
};

// Manually define styles that are used in other custom styles.
// Otherwise, they won't be handled as expected.
defineStyleAlias('fontSize');
defineStyleAlias('lineHeight');
defineStyleAlias('fontWeight');
defineStyleAlias('fontStyle');
defineStyleAlias('letterSpacing');
defineStyleAlias('textTransform');
defineStyleAlias('fontFamily');
// Style aliases
defineStyleAlias('gridAreas', 'grid-template-areas');
defineStyleAlias('gridColumns', 'grid-template-columns', columnsConverter);
defineStyleAlias('gridRows', 'grid-template-rows', rowsConverter);
defineStyleAlias('gridTemplate', 'grid-template', (val) => {
  if (typeof val !== 'string') return;

  return val
    .split('/')
    .map((s, i) => (i ? columnsConverter : rowsConverter)(s))
    .join('/');
});

[
  displayStyle,
  transitionStyle,
  resetStyle,
  fillStyle,
  widthStyle,
  marginStyle,
  gapStyle,
  flowStyle,
  colorStyle,
  heightStyle,
  radiusStyle,
  borderStyle,
  shadowStyle,
  paddingStyle,
  presetStyle,
  boxShadowCombinator,
  outlineStyle,
  fontStyle,
  fontStyleStyle,
  groupRadiusAttr,
  styledScrollbarStyle,
]
  // @ts-ignore
  .forEach((handler) => defineCustomStyle(handler));
