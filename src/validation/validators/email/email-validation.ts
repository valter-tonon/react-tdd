import {FieldValidation} from "@/validation/protocols/field-validation";
import {InvalidFieldError} from "@/validation/errors/invalid-field-error";

export class EmailValidation implements FieldValidation {
    constructor (readonly field: string) {}

    validate(fieldValue: string): Error {
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return (!fieldValue || emailRegex.test(fieldValue)) ? null : new InvalidFieldError(this.field)
    }
}
