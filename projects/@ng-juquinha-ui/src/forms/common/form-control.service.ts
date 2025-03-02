import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

export const FORM_CONTROL = {
  API_ERROR_MESSAGE_KEY: 'ApiErrorMessage',
  SEPARATOR_IDENTIFIER: '<<>>',
};

@Injectable({
  providedIn: 'root',
})
export class FormControlService {
  public setControlError(
    formGroup: FormGroup,
    formControlName: string,
    errorMessage: string,
  ): void {
    if (!formGroup) return;
    errorMessage = `${FORM_CONTROL.API_ERROR_MESSAGE_KEY}${FORM_CONTROL.SEPARATOR_IDENTIFIER}${errorMessage}`;
    const control = formGroup.controls[formControlName];
    control.setErrors({
      [errorMessage]: true,
    });
  }
}
