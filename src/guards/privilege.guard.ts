import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const privilege = this.reflector.get<string[]>(
      'privilege',
      context.getHandler(),
    );
    console.log(privilege);
    if (!privilege) {
      return true;
    }
    return false;
  }
}
