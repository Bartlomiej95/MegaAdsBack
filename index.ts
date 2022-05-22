import express, {json, Router} from "express";
import cors from "cors";
import 'express-async-errors';
import rateLimit from "express-rate-limit";
import {handleError} from "./utils/errors";
import {adRouter} from "./routers/ad.router";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 request per `window` (here per 5 minutes)
}))

const router = Router();

router.use('/ad', adRouter)

app.use(handleError)

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port htttp://localhost:3001');
})