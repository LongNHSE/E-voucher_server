import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  async login() {
    return { msg: 'Login from service' };
  }
  async register() {
    return { msg: 'Register' };
  }
}
// Path: src/auth/auth.controller.ts
