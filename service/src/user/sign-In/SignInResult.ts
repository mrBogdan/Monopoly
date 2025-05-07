export class SignInResult {
    constructor(
        private _id: string,
        private _email: string,
        private _accessToken: string,
        private _refreshToken: string,
    ) {
    }

    get id(): string {
        return this._id;
    }

    get email(): string {
        return this._email;
    }

    get accessToken(): string {
        return this._accessToken;
    }
    get refreshToken(): string {
        return this._refreshToken;
    }
}
