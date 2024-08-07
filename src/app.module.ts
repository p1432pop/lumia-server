import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RankModule } from './rank/rank.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BatchModule } from './batch/batch.module';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { CacheModule } from '@nestjs/cache-manager';
import { NewsModule } from './news/news.module';
import { ItemModule } from './item/item.module';
import { StatisticsModule } from './statistics/statistics.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          database: configService.get<string>('DB_NAME'),
          password: configService.get<string>('DB_PASSWORD'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: true,
        };
      },
    }),
    CacheModule.register({ isGlobal: true, ttl: 600000 }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../build'),
      serveStaticOptions: {
        setHeaders(res, path, stat) {
          res.setHeader('Cache-Control', 'max-age=6000, immutable');
        },
      },
    }),
    RankModule,
    BatchModule,
    UserModule,
    GameModule,
    NewsModule,
    ItemModule,
    StatisticsModule,
  ],
})
export class AppModule {}
