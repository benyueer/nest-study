import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { GqlAuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [AuthResolver, AuthService, GqlAuthGuard, JwtStrategy],
  controllers: [AuthController],
  exports: [GqlAuthGuard, AuthService],
})
export class AuthModule {}
