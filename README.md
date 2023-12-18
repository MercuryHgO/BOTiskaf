
# Telegram bot, built with some architecture.

## About
Made with [this](https://www.youtube.com/watch?v=ssaG31RBao0) tutorial

This is the pet project thai I will be using to learn Telegram API and [Telegraf.js](https://github.com/telegraf/telegraf)

<!--toc:start-->
- [Telegram bot, built with some architecture.](#telegram-bot-built-with-some-architecture)
  - [About](#about)
- [Docs](#docs)
  - [Diagrams](#diagrams)
    - [Full with main file](#full-with-main-file)
    - [Services](#services)
    - [Models](#models)
<!--toc:end-->

# Docs

## Diagrams

### Full with main file
```mermaid
classDiagram
    class Bot {
        -bot: Telegraf*
        -commands: CommandModel[]*
        -configService: IConfigService
        
        constructor(configService: IConfigService)
        
        +init()
    }
    
    Bot..>Telegraf
    Bot..>StartCommand
    Bot..>ConfigService
    
    class IConfig {
        <<interface>>
        +get(key: string): string
    }
    class ConfigService {
        -config: DotenvParseOutput*

        +get(key: string): string
    }
    ConfigService..|>IConfig
    
    class CommandModel {
        <<abstract>>
        constructor(public bot: Telegraf<IContext>)

        *handle(): void
    }

    class StartCommand {
        constructor(public bot: Telegraf<IContext>)

        +handle(): void
    }

    class Telegraf

    StartCommand--|>CommandModel
    StartCommand..>Telegraf
    CommandModel..>Telegraf
```

### Services

```mermaid
classDiagram
    
    class IConfig {
        <<interface>>
        +get(key: string): string
    }
    class ConfigService {
        -config: DotenvParseOutput*

        +get(key: string): string
    }
    ConfigService..|>IConfig
```

### Models

```mermaid
    classDiagram
        class CommandModel {
            <<abstract>>
            constructor(public bot: Telegraf<IContext>)
            
            *handle(): void
        }
        
        class StartCommand {
            constructor(public bot: Telegraf<IContext>)
            
            +handle(): void
        }
        
        class Telegraf
        
        StartCommand--|>CommandModel
        StartCommand..>Telegraf
        CommandModel..>Telegraf
```
