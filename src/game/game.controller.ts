import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/:gameId')
  get(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.gameService.get(gameId);
  }
}
