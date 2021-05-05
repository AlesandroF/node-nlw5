import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersReporitory"

class UserService {
    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository)
    }

    async create(email: string) {
        const userExists = await this.usersRepository.findOne({ email });

        if (userExists) {
            return userExists;
        }

        const newUser = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(newUser);

        return newUser;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({
            email,
        });
        return user;
    }
}

export { UserService }