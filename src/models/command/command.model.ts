import {Telegraf} from 'telegraf';
import {IContext} from '../context/context.inteface.js';

export abstract class CommandModel {
    constructor(public bot: Telegraf<IContext>) {}
    
    abstract handle(): void;
}