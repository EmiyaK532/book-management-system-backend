import {
    BadRequestException,
    Inject,
    Injectable,
} from '@nestjs/common';
import {
    CreateUserDto,
    RegisterUserDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DbService } from 'src/db/db.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    create(createUserDto: CreateUserDto) {
        return 'This action adds a new user';
    }

    findAll() {
        return `This action returns all user`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(
        id: number,
        updateUserDto: UpdateUserDto,
    ) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    @Inject(DbService)
    private dbService: DbService;
    async register(
        registerUserDto: RegisterUserDto,
    ) {
        const users: User[] =
            await this.dbService.read();

        const foundUser = users.find(
            (item) =>
                item.username ===
                registerUserDto.username,
        );

        if (foundUser) {
            throw new BadRequestException(
                '该用户已完成了注册',
            );
        }

        const user = new User();
        user.username = registerUserDto.username;
        user.password = registerUserDto.password;
        users.push(user);

        await this.dbService.write(users);
        return user;
    }
}
