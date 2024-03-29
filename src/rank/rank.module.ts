import { Module } from '@nestjs/common';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './ranking.entity';
import { RankRepository } from './rank.repository';
import { AxiosModule } from 'src/axios/axios.module';
import { Updated } from './updated.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Updated]), AxiosModule],
  controllers: [RankController],
  providers: [RankService, RankRepository],
  exports: [RankService],
})
export class RankModule {}
