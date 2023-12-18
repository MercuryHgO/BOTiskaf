import {IConfigService} from './services/config/config.interface.js';
import { Telegraf} from 'telegraf';
import {ConfigService} from './services/config/config.service.js';
import {IContext} from './models/context/context.inteface.js';
import {CommandModel} from './models/command/command.model.js';
import {StartCommand} from './models/command/start.command.js';
import LocalSession from 'telegraf-session-local';

class Bot {
    private readonly bot: Telegraf<IContext>;
    
    private commands: CommandModel[];
    
    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IContext>(this.configService.get('TOKEN'));
        this.bot.use(new LocalSession({ database: 'sessions.json'}).middleware());
        
        this.commands = [
            new StartCommand(this.bot)
        ];
    }
    
    init() {
        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
    
        this.commands.forEach(
            command => {
                command.handle();
            }
        );
        
        this.bot.launch();
    }
    
}

const bot = new Bot(new ConfigService());
bot.init();

