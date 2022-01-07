import {InvalidFieldError} from "@/validation/errors/invalid-field-error";
import {MinLenghtValdation} from "@/validation/validators/min-lenght/min-lenght-validation";
import * as faker from "faker";

const makeSut = (field: string, minLenght: number): MinLenghtValdation => new MinLenghtValdation(field, minLenght);


describe('MinLenghtValdation', function () {
    test('Should return error if value is less than minLenght', function () {
        const sut = makeSut('password',5);
        var result = sut.validate(faker.random.alphaNumeric(4));
        expect(result).toEqual(new InvalidFieldError('password'));
    });

    test('Should return null if value is valid', function () {
        const sut = makeSut('password',5);
        const result = sut.validate(faker.random.alphaNumeric(5));
        expect(result).toBeFalsy();
    });

});
