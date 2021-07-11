import { ExpressMiddleware, NestMiddleware } from "@nestjs/common";
export interface CorsMiddleware implements NestMiddleware {
    resolve(): ExpressMiddleware;
}
