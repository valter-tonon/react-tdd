export class RequiredFieldError extends Error {
    constructor(readonly field: string){
        super(`Campo ${field} é obrigatório`);
        this.name = 'RequiredFieldError';
    }
}
