import 'reflect-metadata';
import { Request, Response } from 'express';
import { controller, get, post } from '../decorator';
import { getResponseData } from '../utils/util';

interface BodyRequest extends Request {
  body: { [key: string]: string | undefined };
}

@controller('/api')
export class LoginController {
  static isLogin(req: BodyRequest): boolean {
    return req.session ? req.session.login : false;
  }

  @get('/isLogin')
  isLogin(req: BodyRequest, res: Response): void {
    const isLogin = LoginController.isLogin(req);
    res.json(getResponseData(isLogin));
  }

  @post('/login')
  login(req: BodyRequest, res: Response): void {
    const isLogin = LoginController.isLogin(req);
    if (isLogin) {
      res.json(getResponseData(isLogin));
    } else {
      const { password } = req.body;
      if (password === '123' && req.session) {
        req.session.login = true;
        res.json(getResponseData('登入成功'));
      } else {
        res.json(getResponseData('登入失敗', '登入失敗'));
      }
    }
  }

  @get('/logout')
  logout(req: BodyRequest, res: Response): void {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData('已登出'));
  }

  
}
