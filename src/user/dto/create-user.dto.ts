import {
    IsNotEmpty,
    MinLength,
} from 'class-validator';

export class CreateUserDto {}

export class RegisterUserDto {
    @IsNotEmpty({
        message: '用户名不能为空',
    })
    username: string;

    @MinLength(6, {
        message: '密码长度不能小于6',
    })
    @IsNotEmpty({
        message: '密码不能为空',
    })
    password: string;
}
