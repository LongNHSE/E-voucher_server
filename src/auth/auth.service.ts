import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(LoginDTO: LoginDTO) {
    const user = await this.userModel.findOne({ username: LoginDTO.username });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const match = await bcrypt.compare(LoginDTO.password, user.password);
    if (!match) {
      throw new ForbiddenException('Invalid password');
    }
    const token = await this.signToken(user._id);
    const refreshToken = await this.updateRefreshToken(user._id);
    return {
      statusCode: 200,
      message: 'Login successfully',
      token: token,
      refreshToken: refreshToken,
    };
  }

  async register(dto: AuthDTO): Promise<string | any> {
    //generate password hash
    const hash = await bcrypt.hash(dto.password, 10);
    //create new user
    try {
      const newUser = new this.userModel({ ...dto, password: hash });
      const token = await this.signToken(newUser._id);
      await newUser.save();
      const refreshToken = await this.updateRefreshToken(newUser._id);
      return {
        statusCode: 201,
        message: 'Created successfully',
        token: token,
        refreshToken: refreshToken,
      };
    } catch (e) {
      if (e instanceof MongoServerError) {
        if (e.code === 11000) {
          return e;
        }
        return e;
      } else {
        return { message: 'Something went wrong' };
      }
    }
  }

  async logout(userId: string) {
    try {
      await this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
      return { statusCode: 204, message: 'Logout successfully' };
    } catch (error) {
      console.error(error);
      throw new Error('Logout failed');
    }
  }

  async signToken(userId: string): Promise<string> {
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync({ userId }, { expiresIn: '15m', secret: secret });
  }

  async updateRefreshToken(userId: string): Promise<string> {
    const secret = this.config.get('JWT_REFRESH_SECRET');
    const refreshToken = await this.jwt.signAsync(
      { userId },
      { expiresIn: '7d', secret: secret },
    );
    await this.userModel.findByIdAndUpdate(userId, {
      refreshToken: refreshToken,
    });
    return refreshToken;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    console.log(userId, refreshToken);
    const user = await this.userModel.findById(userId);
    console.log(user);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = refreshToken === user.refreshToken;
    console.log(refreshTokenMatches);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.signToken(user.id);
    return tokens;
  }
}
// Path: src/auth/dto/auth.dto.ts