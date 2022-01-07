export class InvalidFieldError extends Error {
    constructor (readonly field: string) {
        super(`O Campo ${field} é inválido`);
    }
}
