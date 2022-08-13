import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/domains/user/entity/user.entrty';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { Auth } from './entity/auth.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Auth)
  async login(@Args('data') { password, email }: LoginInput) {
    const accessToken = this.authService.login(email, password);
    return { accessToken };
  }
}
