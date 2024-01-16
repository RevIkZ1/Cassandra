import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './LocalStrategy';
import { JwtModule } from '@nestjs/jwt';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { UserRepository } from 'src/user/user.repository';
@Module({
  imports: [CassandraModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UserRepository,
    },
    LocalStrategy,
  ],
})
export class AuthModule {}
