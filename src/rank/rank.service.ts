import { Injectable } from '@nestjs/common';
import { RankRepository } from './rank.repository';
import { Ranking } from './ranking.entity';
import { AxiosService } from 'src/axios/axios.service';

@Injectable()
export class RankService {
  constructor(
    private readonly rankRepository: RankRepository,
    private readonly axiosService: AxiosService,
  ) {}
  getRanking(seasonId: number): Promise<Ranking[]> {
    return this.rankRepository.getRanking(seasonId);
  }
  /*   getUserNumByNickname(nickname: string): Promise<number> {
    return this.axiosService.getUserNumByNickname(nickname);
  }
  getGameByGameId(gameId: number): Promise<any> {
    return this.axiosService.getGameByGameId(gameId);
  }
  getGamesByGameIds(gameIds: number[]): Promise<any> {
    return this.rankRepository.insertGames(this.axiosService.getGamesByGameIds(gameIds));
  } */
  async updateRanking(seasonId: number) {
    console.log(1);
    const result = await this.axiosService.getSeasonRanking(seasonId);
    console.log(2);
    await this.rankRepository.updateRanking(result);
    console.log(3);
  }
}
