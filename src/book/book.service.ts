/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
    return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
    constructor(
        private readonly dbService: DbService,
    ) {}

    //获取图书列表
    async list(name: string) {
        // 读取图书列表
        const books = await this.dbService.read();
        return name
            ? books.filter((book) => {
                  return book.name.includes(name);
              })
            : books;
    }

    //根据id获取图书
    async findById(id: number) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const books: Book[] =
            await this.dbService.read();
        return books.find(
            (book) => book.id === id,
        );
    }

    //创建图书
    async create(createBookDto: CreateBookDto) {
        const books: Book[] =
            await this.dbService.read();

        const book = new Book();
        book.id = randomNum();
        book.author = createBookDto.author;
        book.name = createBookDto.name;
        book.description =
            createBookDto.description;
        book.cover = createBookDto.cover;

        books.push(book);

        try {
            await this.dbService.write(books);
            console.log(
                '图书创建成功: ',
                book.description,
            );
            return book;
        } catch (error: any) {
            throw new BadRequestException(
                '图书创建失败',
            );
        }
    }

    //更新图书
    async update(updateBookDto: UpdateBookDto) {
        const books: Book[] =
            await this.dbService.read();

        const foundBook = books.find((book) => {
            console.log(
                book.id,
                +updateBookDto.id,
            );
            console.log(
                book.id === +updateBookDto.id,
                updateBookDto instanceof
                    UpdateBookDto,
            );
            return book.id === +updateBookDto.id;
        });

        if (!foundBook) {
            throw new BadRequestException(
                '图书不存在',
            );
        }

        foundBook.name = updateBookDto.name;
        foundBook.description =
            updateBookDto.description;
        foundBook.cover = updateBookDto.cover;

        await this.dbService.write(books);
        return foundBook;
    }

    //删除图书
    async delete(id: number) {
        const books: Book[] =
            await this.dbService.read();
        const index = books.findIndex(
            (book) => book.id === id,
        );

        if (index !== -1) {
            books.splice(index, 1);
            await this.dbService.write(books);
            return '图书删除成功';
        }

        throw new BadRequestException(
            '图书不存在',
        );
    }
}
