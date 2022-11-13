import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const ownValidator = (regex: RegExp): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value || (value && value.length < 2)) {
      return null;
    }

    const allowed = regex.test(value);
    return allowed ? null : { errorMsg: true };
  };
};

export const passValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errorMessage = {
      errorMsg: {
        hasMinLength: '',
        hasUpperCase: '',
        hasNumeric: '',
        hasSpecSymbol: '',
      },
    };

    if (!value) {
      return null;
    }

    const hasMinLength = /^.{8,}$/.test(value);

    if (!hasMinLength) {
      errorMessage.errorMsg.hasMinLength =
        'Minimum password length 8 characters';
    }

    const hasUpperCase = /[A-Z]/.test(value);

    if (!hasUpperCase) {
      errorMessage.errorMsg.hasUpperCase =
        'Password must contain uppercase letters';
    }

    const hasNumeric = /[0-9]/.test(value);

    if (!hasNumeric) {
      errorMessage.errorMsg.hasNumeric = 'Password must contain numbers';
    }
    const hasSpecSymbol = /[!@#?\]]/.test(value);

    if (!hasSpecSymbol) {
      errorMessage.errorMsg.hasSpecSymbol =
        'Password must contain special chars: ! @ # ? ]';
    }

    return hasMinLength && hasUpperCase && hasNumeric && hasSpecSymbol
      ? null
      : errorMessage;
  };
};
