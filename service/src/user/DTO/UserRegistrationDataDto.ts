export class UserRegistrationDataDto {
    constructor(
        private _name: string,
        private _email: string,
        private _password: string,
        private _repeatedPassword: string
    ) {
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get password(): string {
        return this._password;
    }
    get repeatedPassword(): string {
        return this._repeatedPassword;
    }
}