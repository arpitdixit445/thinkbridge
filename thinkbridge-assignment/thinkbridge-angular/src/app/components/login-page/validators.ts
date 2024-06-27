import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static noSpaces(control: AbstractControl): ValidationErrors | null {
    const isSpace = (control.value || '').match(/\s/g);
    return isSpace ? {'whitespace': "can not have white spaces"} : null;
};

static minLength(control: AbstractControl): ValidationErrors | null {
    const isLong = (control.value || '').length < 8;
    return isLong ? {'long': "should atleast be 8 characters long."} : null;
};
}
