import {RequiredFieldValidation} from "@/validation/validators/require-field/required-field-validation";
import {ValidationBuilder} from "@/validation/validators/builder/validation-builder";
import {EmailValidation} from "@/validation/validators/email/email-validation";
import {MinLenghtValdation} from "@/validation/validators/min-lenght/min-lenght-validation";

describe('ValidationBuilder', function () {
    test('should return requiredFieldValidation', function () {
        const validations = ValidationBuilder.field('any_field')
            .required()
            .build();
        expect(validations).toEqual([new RequiredFieldValidation('any_field')]);
    });

    test('Should return EmailValidation', function () {
        const validations = ValidationBuilder.field('any_field')
            .email()
            .build();
        expect(validations).toEqual([new EmailValidation('any_field')]);
    });

    test('Should return MinLenghtValidation', function () {
        const validations = ValidationBuilder.field('any_field')
            .min(5)
            .build();
        expect(validations).toEqual([new MinLenghtValdation('any_field', 5)]);
    });

    test('Should return multiple validations', function () {
        const validations = ValidationBuilder.field('any_field')
            .required()
            .email()
            .min(5)
            .build();
        expect(validations).toEqual([
            new RequiredFieldValidation('any_field'),
            new EmailValidation('any_field'),
            new MinLenghtValdation('any_field', 5)
        ]);
    });

});
