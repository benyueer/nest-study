import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { User } from '../user/entity/user.entrty';
import { Book } from './entity/book.entity';

@Resolver()
export class BookResolver {
  @UseGuards(GqlAuthGuard)
  @Query(() => Book)
  getBook(@UserEntity() user: User, @Args('name') name: string) {
    console.log('user', user);
    return { name };
  }
}
