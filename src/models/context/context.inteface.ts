import { Context } from 'telegraf';

interface SessionData {
    courseLike: boolean;
}

export interface IContext extends Context {
    session: SessionData;
}