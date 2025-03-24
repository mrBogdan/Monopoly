import http from 'node:http';
import {Headers} from './headers';
import {UserRegistrationDataDto} from "../user/DTO/UserRegistrationDataDto";
import {createUserService} from "../user/UserService";

export const requestHandler = async (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.method?.toLowerCase() === 'get' && req.url === '/health') {
        res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});
        res.end(JSON.stringify({ message: 'OK' }));
        return;
    }

    if (req.url === '/public/sign-up') {
        res.writeHead(200, {'Content-Type': Headers.ContentTypes.json});

        // TODO: Create validators for request. [requiredFields, pairFieldsEquality...]. Refactor UserService after.

        const { name, email, password, repeatedPassword } = await getBody(req);
        const userService = await createUserService();
        await userService.register(new UserRegistrationDataDto(name, email, password, repeatedPassword,));

        res.end(JSON.stringify({ message: 'Sign up' }));

        return;
    }

    res.writeHead(404, {'Content-Type': Headers.ContentTypes.json});
    res.end(JSON.stringify({ message: 'Not found' }));
}

const getBody = async (req: http.IncomingMessage): Promise<never> => {
    return new Promise((resolve) => {
        const data: string[] = [];
        req.on('data', (chunk) => {
            data.push(chunk);
        });

        req.on('end', () => {
            resolve(JSON.parse(data.join('')))
        });
    });
}