import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field({ nullable: true })
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
