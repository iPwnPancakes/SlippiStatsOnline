import { Either } from "../../../Core/Either";
import { SlippiGame } from "../../../Models/SlippiGame";
import { Result } from "../../../Core/Result";

export type GetGamesByTagResponse = Either<Error, Result<SlippiGame[]>>;
