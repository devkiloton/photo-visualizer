import { AbstractControl } from "@angular/forms";
/*
* Validators receive an AbstractControl object as a parameter and return an object if the validation fails, or null if it passes.
*/
export const lowerCaseValidator = (control: AbstractControl) => {
    if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        // The return object must have a key that matches the name of the validator. This key(lowerCase) will be used to display the error message. eg. `errors.lowerCase`
        return { lowerCase: true };
    }
    return null;
}