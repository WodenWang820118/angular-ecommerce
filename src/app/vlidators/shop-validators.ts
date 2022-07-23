import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {
    // the method shows how to implement a custom validator
    // in fact, the whitespace detection could be dealt with regex
    static hasOnlyWhiteSpace(control: AbstractControl): ValidationErrors | null {
        if (control.value && control.value.trim().length === 0) {
            return { hasOnlyWhiteSpace: true };
        }
        return null;
    }
}
