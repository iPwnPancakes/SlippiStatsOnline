import { Either } from "../../core/Either";
import { SlippiGame } from "../../models/SlippiGame";
import { Result } from "../../core/Result";

export type GetGamesByTagResponse = Either<Error, Result<SlippiGame[]>>;
