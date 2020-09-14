import { GameSchema } from 'src/shared/game-schema';

export interface LastRoundCall {

    lastRound(schema: GameSchema, solvedOneCell: boolean);
}
