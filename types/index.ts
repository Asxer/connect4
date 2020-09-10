import { PlayerColor } from '~/enums/player-color.enum'

export declare interface Point {
  color: PlayerColor | null;
}

export declare interface Column {
  points: Point[];
  occupied: number;
  isFull: boolean;
}
