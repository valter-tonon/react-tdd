import {EmailValidation} from "@/validation/validators/email/email-validation";
import {InvalidFieldError} from "@/validation/errors/invalid-field-error";
import faker from "@faker-js/faker";

const makeSut = (field: string): EmailValidation => new EmailValidation(field);


describe('EmailValidation', function () {
    test('should return error when email is invalid', function () {
        const sut = makeSut('email');
        const result = sut.validate(faker.random.word());
        expect(result).toEqual(new InvalidFieldError('email'));
    });

    test('should return falsy when email is valid', function () {
        const sut = makeSut('email');
        const result = sut.validate(faker.internet.email());
        expect(result).toBeFalsy();
    });

    test('should return falsy when email is empty', function () {
        const sut = makeSut('email');
        const result = sut.validate('');
        expect(result).toBeFalsy();
    });
});
