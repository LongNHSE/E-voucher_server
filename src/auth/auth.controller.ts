import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, LoginDTO } from './dto';
import { MongooseExceptionFilter } from 'src/filters/mongoose-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator';
import { User } from 'src/user/schema/user.schema';
import { use } from 'passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signin')
  signin(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
  @Post('signup')
  register(@Body() body: AuthDTO) {
    return this.authService.register(body);
  }
  @Get('logout')
  @UseGuards(AuthGuard('jwt'))
  async logout(@GetUser() user: any) {
    if (user.userId) {
      return this.authService.logout(user.userId);
    } else {
      throw new BadRequestException('Invalid user ID');
    }
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refresh(@Req() req: any) {
    console.log(req.user);
    const userId = req.user['userId'];
    const refreshToken = req.user['refreshToken'];
    const accessToken = await this.authService.refreshTokens(
      userId,
      refreshToken,
    );
    console.log(accessToken);
    return {
      statusCode: 200,
      message: 'Token refreshed successfully',
      accessToken: accessToken,
    };
  }
}
