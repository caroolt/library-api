import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { Roles } from './roles/roles.decorator';
import { RolesGuard } from './roles/roles.guard';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('user')
  @ApiOperation({ summary: 'Get all users' })
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  @Roles('user')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBearerAuth()
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Get('email/:email')
  @ApiBearerAuth()
  @Roles('user')
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiParam({ name: 'email', description: 'User email' })
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user by ID (if Admin)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({
    schema: {
      example: {
        name: 'Updated Name',
        email: 'updated@example.com',
        password: 'newpassword',
      },
    },
  })
  updateUser(@Param('id') id: string, @Body() updateUser: any) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user by ID (if Admin)' })
  @ApiParam({ name: 'id', description: 'User ID' })
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
