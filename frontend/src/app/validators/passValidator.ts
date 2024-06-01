import { AbstractControl } from "@angular/forms";

export function passwordValidator(control: AbstractControl){
    const password = control.value;

    if(!password){
        return null;
    }

    const hasUpperCase = /[A-Z]+/.test(password);

    const hasLowerCase = /[a-z]+/.test(password);

    const hasNumeric = /[0-9]+/.test(password);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? {passwordStrength:true}: null;
}
