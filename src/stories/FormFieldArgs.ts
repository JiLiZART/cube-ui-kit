import { baseProps } from './lists/baseProps';

export const DISABLE_BASE_ARGS = baseProps.reduce((map, prop) => {
  map[prop] = { table: { disable: true } };

  return map;
}, {});

export const LABEL_POSITION_ARG = {
  labelPosition: {
    description: 'The position of labels for each field.',
    options: ['top', 'side'],
    control: 'radio',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'top' },
    },
  },
};

export const LABEL_ARG = {
  label: {
    // defaultValue: 'Field label',
    control: 'text',
    description: 'The content to display as the label.',
  },
};

export const NECESSITY_INDICATOR_ARG = {
  necessityIndicator: {
    // defaultValue: 'icon',
    description: 'Type of the necessity indicator',
    options: ['icon', 'label', false],
    control: 'radio',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'icon' },
    },
  },
};

export const MESSAGE_ARG = {
  message: {
    // defaultValue: '',
    description: 'Validation error message',
    control: 'text',
  },
};

export const PLACEHOLDER_ARG = {
  placeholder: {
    // defaultValue: 'Placeholder',
    control: 'text',
  },
};

export const VALIDATION_STATE_ARG = {
  validationState: {
    // defaultValue: undefined,
    description:
      'Whether the input should display its "valid" or "invalid" visual styling.',
    options: [undefined, 'valid', 'invalid'],
    control: 'radio',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'top' },
    },
  },
};

export const IS_LOADING_ARG = {
  isLoading: {
    control: 'boolean',
    description: 'Loading state with spinner. Also works as disabled',
    // defaultValue: false,
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
  },
};

export const AUTO_FOCUS_ARG = {
  autoFocus: {
    // defaultValue: false,
    description: 'Whether the element should receive focus on render.',
    control: {
      type: 'boolean',
    },
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
  },
};

export const IS_REQUIRED_ARG = {
  isRequired: {
    // defaultValue: false,
    description:
      'Whether user input is required on the input before form submission. Often paired with the necessityIndicator prop to add a visual indicator to the input.',
    control: {
      type: 'boolean',
    },
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
  },
};

export const IS_READ_ONLY_ARG = {
  isReadOnly: {
    // defaultValue: false,
    description:
      'Whether the input can be selected but not changed by the user.',
    control: {
      type: 'boolean',
    },
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
  },
};

export const IS_DISABLED_ARG = {
  isDisabled: {
    // defaultValue: false,
    description: 'Whether the input is disabled.',
    control: {
      type: 'boolean',
    },
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
  },
};

export const SIZE_ARG = {
  size: {
    // defaultValue: undefined,
    description: 'The size of the button',
    options: [undefined, 'default', 'small'],
    control: 'radio',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'default' },
    },
  },
};

export const MULTILINE_ARG = {
  multiLine: {
    // defaultValue: false,
    description: 'Whether the input is multiline.',
    control: {
      type: 'boolean',
    },
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: false },
    },
  },
};

export const REQUIRED_MARK_ARG = {
  requiredMark: {
    // defaultValue: true,
    description: 'Whether to show the required mark on labels.',
    control: {
      type: 'boolean',
    },
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: true },
    },
  },
};
