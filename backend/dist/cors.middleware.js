"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    return (req, res, next) =  & gt;
    {
        let allowedOrigins = ["http://localhost:3000", "https://w11k.de"];
        if (allowedOrigins.indexOf(req.header("Origin")) & gt)
            ;
        -1;
        {
            res.header("Access-Control-Allow-Origin", req.header("Origin"));
            res.header("Access-Control-Allow-Headers", "content-type");
            res.header("Access-Control-Allow-Methods", "POST");
        }
        next();
    }
    ;
}
//# sourceMappingURL=cors.middleware.js.map