import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { filter } from 'rxjs';
import { MongooseExceptionFilter } from 'src/filters/mongoose-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { UserDocument } from './schema/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(MongooseExceptionFilter)
  async create(@Body() createUserDto: CreateUserDto) {
    // throw new HttpException('This is a test errorr', HttpStatus.CREATED);
    // throw new UnauthorizedException(
    //   'You are not authorized to perform this action',
    // );
    return await this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
