import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('player')
export class Player extends BaseEntity {
  @PrimaryColumn()
  userNum: number;

  @Column({
    length: 16,
  })
  nickname: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @Column({
    default: 0,
  })
  lastGameId: number;
}
