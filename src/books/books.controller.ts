import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({
    schema: {
      example: {
        title: 'Book Title',
        description: 'Book Description',
        publicationDateedDate: '2023-01-01',
        authorId: 'authorId',
      },
    },
  })
  createBook(@Body() createBook: any) {
    return this.booksService.createBook(createBook);
  }

  @Get()
  @ApiBearerAuth()
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
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  findOneBook(@Param('id') id: string) {
    return this.booksService.findOneBook(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiBody({
    schema: {
      example: {
        title: 'Updated Title',
        description: 'Updated Description',
        publicationDateedDate: '2023-01-01',
        authorId: 'authorId',
      },
    },
  })
  updateBook(@Param('id') id: string, @Body() updateBook: any) {
    return this.booksService.updateBook(id, updateBook);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
