import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getIconsName } from '../../icons/icon/icon.data';

export const formControlArgs = {
  fieldId: {
    control: 'text',
    description: 'Identifier of the field.',
    type: { name: 'string', required: true },
  },
  label: {
    control: 'text',
    description: 'Label text on top of the field.',
    type: { name: 'string', required: true },
  },
  subLabel: {
    control: 'text',
    description: 'Sub label on right of the label.',
    type: { name: 'string', required: false },
  },
  hintText: {
    control: 'text',
    description: 'Hint text on bottom of the field.',
    type: { name: 'string', required: false },
  },
  placeholder: {
    control: 'text',
    description: 'Placeholder of the field.',
    type: { name: 'string', required: false },
  },
  iconLeft: {
    control: 'select',
    options: getIconsName(),
    description: 'Icon on left side of field.',
    type: { name: 'string', required: false },
  },
  iconRight: {
    control: 'select',
    options: getIconsName(),
    description: 'Icon on right side of field.',
    type: { name: 'string', required: false },
  },
  mode: {
    control: 'select',
    options: ['static', 'float'],
    description: 'Set mode of exibition to float or static.',
    type: { name: 'string', required: false },
  },
  disabled: {
    control: 'boolean',
    description:
      'State of the field. When disabled is true, the field is blocked.',
    type: { name: 'boolean', required: false },
  },
  customErrorMessages: {
    control: 'object',
    description: 'Custom error messages for form validation.',
    type: { name: 'object', required: false },
  },
  maxLength: {
    control: 'number',
    description: 'Max length of field.',
    type: { name: 'number', required: false },
  },
};

export const defaultArgs = {
  label: 'Label',
  controlName: 'example',
  ariaLabel: 'Aria label',
  subLabel: 'Sub label',
  hintText: 'Hint text',
  placeholder: 'Placeholder',
  tabIndex: 1,
  disabled: false,
  customErrorMessages: {},
  maxLength: 999,
  iconLeft: '',
  iconRight: '',
  mode: 'static',
};

export const formGroupRef = new FormGroup({
  example: new FormControl('', [Validators.required]),
  example2: new FormControl('', [Validators.required]),
  example3: new FormControl('', [Validators.required]),
  example4: new FormControl('', [Validators.required]),
  exampleRequired: new FormControl('', [Validators.required]),
  exampleRequiredTrue: new FormControl('', [Validators.requiredTrue]),
});

export const formGroupRefWithoutValidators = new FormGroup({
  example: new FormControl(''),
});
