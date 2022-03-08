import {ValidationComposite} from "@/validation/validators/validation-composite/validation-composite";
import {ValidationBuilder} from "@/validation/validators/builder/validation-builder";

export const makeLoginValidationComposite = (): ValidationComposite => {
    return ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
    ]);
};
