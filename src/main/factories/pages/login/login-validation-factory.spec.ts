import {makeLoginValidationComposite} from "@/main/factories/pages/login/login-validation-factory";
import {ValidationComposite} from "@/validation/validators/validation-composite/validation-composite";
import {ValidationBuilder} from "@/validation/validators/builder/validation-builder";

describe('LoginValidationFactory', function () {
    test('Should make ValidationComposite with correct validation', () =>{
        const composite = makeLoginValidationComposite()
        expect(composite).toEqual(
            ValidationComposite.build([
                ...ValidationBuilder.field('email').required().email().build(),
                ...ValidationBuilder.field('password').required().min(5).build()
            ])
        )
    });
});
