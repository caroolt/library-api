import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Roles } from '../users/roles/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/users/roles/roles.guard';

@ApiTags('books')
@Controller('books')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book (if Admin)' })
  @ApiBody({
    schema: {
      example: {
        title: 'Book Title',
        description: 'Book Description',
        publicationDate: '2023-01-01',
        author: 'authorId',
      },
    },
  })
  createBook(@Body() createBook: any) {
    return this.booksService.createBook(createBook);
  }

  @Get()
  @ApiBearerAuth()
  @Roles('user')
  @ApiOperation({ summary: 'Get all books' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit of results per page',
  })
  @ApiQuery({ name: 'sort', required: false, description: 'Field to sort by' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search books by title',
  })
  findAllBooks() {
    return this.booksService.findAllBooks();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles('user')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  findOneBook(@Param('id') id: string) {
    return this.booksService.findOneBook(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a book by ID (if Admin)' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiBody({
    schema: {
      example: {
        title: 'Updated Title',
        description: 'Updated Description',
        publicationDate: '2023-01-01',
        authorId: 'authorId',
      },
    },
  })
  updateBook(@Param('id') id: string, @Body() updateBook: any) {
    return this.booksService.updateBook(id, updateBook);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a book by ID (if Admin)' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
