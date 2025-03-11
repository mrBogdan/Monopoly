import { UserService } from './UserService';

export class UserPublicController {
    constructor(private readonly userService: UserService) {
    }
}
