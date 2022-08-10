import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateUserInput, User } from './entity/user.entrty';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async userList() {
    return [{ name: 'John' }, { name: 'Doe' }];
  }
  @Query(() => User)
  async user(@Args('id') id: string) {
    return { name: id };
  }
  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return {
      name: data.name,
    };
  }
}
