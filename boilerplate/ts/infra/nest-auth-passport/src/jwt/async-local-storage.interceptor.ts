import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { asyncLocalStorage } from '@bitloops/bl-boilerplate-core';
import { Observable } from 'rxjs';

@Injectable()
export class AsyncLocalStorageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: any = context.switchToHttp().getRequest();

    const store = asyncLocalStorage.getStore();
    if (!store) throw new Error('No store found, did you forget to attach correlation middleware?');
    if (!request.user) {
      return next.handle();
    }
    const token = this.getJWTToken(request);
    const email = request.user.email;
    const userId = request.user.userId;
    store.set('context', { userId, email, jwt: token });

    return next.handle();
  }

  private getJWTToken(req: Request): string {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];
      return token;
    }
    return '';
  }
}
