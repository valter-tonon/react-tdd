import {RequiredFieldError} from "@/validation/errors/required-field-error";
import {RequiredFieldValidation} from "@/validation/validators/require-field/required-field-validation";
import faker from "@faker-js/faker";

const makeSut = (field: string): RequiredFieldValidation => new RequiredFieldValidation(field);

describe('RequiredFieldValidation', () => {
    test('should return error if field is empty', () => {
        const sut = makeSut('email')
        const result = sut.validate('');
        expect(result).toEqual(new RequiredFieldError('email'));
    });

    test('should return falsy if field is not empty', () => {
        const sut = makeSut('email')
        const result = sut.validate(faker.random.word());
        expect(result).toBeFalsy();
    });
});
