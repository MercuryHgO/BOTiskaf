import {CommandModel} from './command.model.js';
import {Telegraf, Markup} from 'telegraf';
import {IContext} from '../context/context.inteface.js';

export class StartCommand extends CommandModel {
    constructor(bot: Telegraf<IContext>) {
        super(bot);
    }
    
    handle() {
        this.bot.start(
            ctx => {
                const replyKeyboard = Markup.inlineKeyboard(
                    [
                        Markup.button.callback('Yes','amusing_yes'),
                        Markup.button.callback('No','amusing_no'),
                    ],
                );
                
                ctx.replyWithPhoto(
                    {
                        source: 'resources/doIAmuseYou.png'
                    },
                    replyKeyboard
                );
            }
        );
        
        this.bot.action('amusing_yes',
            (ctx) => {
                console.log(ctx);
                ctx.session.courseLike = true;
                ctx.replyWithVideo(
                    {
                        source: 'resources/youreUgly.gif'
                    }
                );
            });
        this.bot.action('amusing_no',
            (ctx) => {
                console.log(ctx);
                ctx.session.courseLike = true;
                ctx.replyWithVideo(
                    {
                        source: 'resources/doIAmuseYou1.gif'
                    }
                );
            });
    }
}