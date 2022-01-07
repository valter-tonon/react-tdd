import {ValidationComposite} from "@/validation/validators/validation-composite/validation-composite";
import {FieldValidationSpy} from "@/validation/validators/test/field-validation-spy";
import * as faker from "faker";

type SutTypes = {
    sut: ValidationComposite
    fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy('any_field'),
        new FieldValidationSpy('any_field')
    ]
    const sut = ValidationComposite.build(fieldValidationsSpy)
    return {
        sut,
        fieldValidationsSpy
    }
}

describe('ValidationComposite', function () {
    test('Should return error if any of the validators fails', function () {
        const {sut, fieldValidationsSpy} = makeSut()
        const errorMessage = faker.random.words()
        fieldValidationsSpy[0].error = new Error(errorMessage);
        fieldValidationsSpy[1].error = new Error('any_error_second');
        const error = sut.validate('any_field', 'any_value');
        expect(error).toBe(errorMessage)
    });

    test('Should return falsy if all validators pass', function () {
        const {sut}= makeSut()
        const error = sut.validate('any_field', 'any_value');
        expect(error).toBeFalsy();
    });
});
