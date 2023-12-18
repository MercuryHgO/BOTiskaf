import {IConfigService} from './config.interface.js';
import {config, DotenvParseOutput} from 'dotenv';

export class ConfigService implements IConfigService {
    private config: DotenvParseOutput;
    
    constructor() {
        const {error, parsed} = config();
        
        if(error) {
            throw error;
        }
        
        if(!parsed) {
            throw new Error('DOTENV_EMPTY');
        }
        
        this.config = parsed;
    }
    
    
    get(key: string): string {
        const res = this.config[key];
        
        if (res)  return res;
        
        throw new Error('NO_DOTENV_VARIABLE+PRESENTED: ' + key);
    }
    
}