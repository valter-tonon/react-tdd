import {FieldValidation} from "@/validation/protocols/field-validation";
import {RequiredFieldValidation} from "@/validation/validators/require-field/required-field-validation";
import {EmailValidation} from "@/validation/validators/email/email-validation";
import {MinLenghtValdation} from "@/validation/validators/min-lenght/min-lenght-validation";

export class ValidationBuilder {
    private constructor (
        private readonly fieldName: string,
        private readonly validations: FieldValidation[]
    ) {}
    static field (fieldName: string): ValidationBuilder {
        return new ValidationBuilder(fieldName, []);
    }

    required (): ValidationBuilder {
        this.validations.push(new RequiredFieldValidation(this.fieldName));
        return this
    }

    email (): ValidationBuilder {
        this.validations.push(new EmailValidation(this.fieldName));
        return this
    }

    min (length: number): ValidationBuilder {
        this.validations.push(new MinLenghtValdation(this.fieldName, length));
        return this
    }

    build (): FieldValidation[] {
        return this.validations;
    }
}
