import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';

import { Roles } from 'src/users/roles/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('authors')
@ApiBearerAuth()
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new author' })
  @ApiBody({
    schema: {
      example: {
        name: 'Author Name',
        biography: 'Author Biography',
        birthDate: '1970-01-01',
      },
    },
  })
  createAuthor(@Body() createAuthor: any) {
    return this.authorService.createAuthor(createAuthor);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
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
    description: 'Search authors by name',
  })
  findAllAuthors() {
    return this.authorService.findAllAuthors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  findOneAuthor(@Param('id') id: string) {
    return this.authorService.findOneAuthor(id);
  }

  @Put(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update an author by ID' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  @ApiBody({
    schema: {
      example: {
        name: 'Updated Name',
        biography: 'Updated Biography',
        birthDate: '1970-01-01',
      },
    },
  })
  updateAuthor(@Param('id') id: string, @Body() updateAuthor: any) {
    return this.authorService.updateAuthor(id, updateAuthor);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete an author by ID' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }
}
