import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
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
import { RolesGuard } from 'src/users/roles/roles.guard';
import type { Author } from './schemas/author.schema';

@ApiTags('authors')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new author (if Admin)' })
  @ApiBody({
    schema: {
      example: {
        name: 'Author Name',
        bio: 'Author bio',
        birthdate: '1970-01-01',
      },
    },
  })
  createAuthor(@Body() createAuthor: any) {
    const author = {
      birthdate: new Date(createAuthor.birthdate),
      ...createAuthor,
    };
    return this.authorService.createAuthor(author);
  }

  @Get()
  @Roles('user')
  @ApiOperation({ summary: 'Get all authors' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (should be greater than 0)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit of results per page',
  })
  @ApiQuery({
    name: 'sortDir',
    required: false,
    description: 'Field to sort by',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Sort authors by name or any parameter you like',
  })
  findAllAuthors(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('sortBy') sortBy: string = 'name',
    @Query('sortDir') sortDir: 'asc' | 'desc' = 'asc',
  ): Promise<Author[]> {
    return this.authorService.findAllAuthors(page, limit, sortBy, sortDir);
  }

  @Get(':id')
  @Roles('user')
  @ApiOperation({ summary: 'Get an author by ID' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  findOneAuthor(@Param('id') id: string) {
    return this.authorService.findOneAuthor(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an author by ID (if Admin)' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  @ApiBody({
    schema: {
      example: {
        name: 'Updated Name',
        bio: 'Updated bio',
        birthDate: '1970-01-01',
      },
    },
  })
  updateAuthor(@Param('id') id: string, @Body() updateAuthor: any) {
    return this.authorService.updateAuthor(id, updateAuthor);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an author by ID (if Admin)' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }
}
