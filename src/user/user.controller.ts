import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
    CreateUserDto,
    RegisterUserDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('register')
    register(
        @Body()
        registerUserDto: RegisterUserDto,
    ) {
        console.log(registerUserDto);

        return this.userService.register(
            registerUserDto,
        );
    }

    @Post('login')
    async login(
        @Body() LoginUserDto: LoginUserDto,
    ) {
        return this.userService.login(
            LoginUserDto,
        );
    }

    @Post()
    create(
        @Body()
        createUserDto: CreateUserDto,
    ) {
        return this.userService.create(
            createUserDto,
        );
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id')
        id: string,
        @Body()
        updateUserDto: UpdateUserDto,
    ) {
        return this.userService.update(
            +id,
            updateUserDto,
        );
    }

    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ) {
        return this.userService.remove(+id);
    }
}
