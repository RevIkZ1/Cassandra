import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CassandraModule } from 'src/common/cassandra/cassandra.module';
import { JwtModule } from '@nestjs/jwt';
import { TimModule } from 'src/tim/tim.module';

@Module({
  imports: [
    TimModule,
    CassandraModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
