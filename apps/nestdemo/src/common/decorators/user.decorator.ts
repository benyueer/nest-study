import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const UserEntity = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('1231');
    return GqlExecutionContext.create(ctx).getContext().req.user;
  },
);
