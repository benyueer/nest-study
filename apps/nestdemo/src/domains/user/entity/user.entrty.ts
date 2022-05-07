import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  name: string;
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;
}
