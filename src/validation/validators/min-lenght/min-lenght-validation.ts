import {FieldValidation} from "@/validation/protocols/field-validation";
import {InvalidFieldError} from "@/validation/errors/invalid-field-error";

export class MinLenghtValdation implements FieldValidation {
    constructor(readonly field: string, private readonly minLenght: number) {}
    validate(fieldValue: string): Error {
        return fieldValue.length >= this.minLenght ? null : new InvalidFieldError(this.field);
    }
}
