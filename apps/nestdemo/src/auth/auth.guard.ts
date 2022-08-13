import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }
  // getRequest(context: ExecutionContext) {
  //   const ctx = GqlExecutionContext.create(context);
  //   console.log(ctx);
  //   return ctx.getContext().req;
  // }
  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   // console.log(context.getArgs()[0].headers.authorization);
  //   // return true;
  //   const res = this.jwtService.verify(
  //     context.getArgs()[0].headers.authorization as string,
  //   );
  //   console.log(res);
  //   return true;
  // }
}
