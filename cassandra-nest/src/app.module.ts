import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CassandraModule } from './common/cassandra/cassandra.module';
import { LigaModule } from './Liga/liga.module';
import { TimModule } from './tim/tim.module';
import { StadionModule } from './stadion/stadion.module';
import { IgracModule } from './Igrac/igrac.module';
import { UtakmicaController } from './Utakmica/utakmica.controller';
import { UtakmicaModule } from './Utakmica/utakmica.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),

    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '3h' },
    }),
    CassandraModule,
    LigaModule,
    TimModule,
    StadionModule,
    IgracModule,
    UtakmicaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
