import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserInput, User } from './entity/user.entrty';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async userList() {
    return [{ name: 'John' }, { name: 'Doe' }];
  }
  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return {
      name: data.name,
    };
  }
}
