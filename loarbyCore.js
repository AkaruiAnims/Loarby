//Entry point + Initializer 
import { modules_service } from "./modules/modules_service.js";
import * as fs from 'fs';
import { loarbyCord } from "./loarbyCord";

const commandsList = fs.readFileSync('./constants/commandsList.json', 'utf8');

// all the Command commands can be ignored for now
class loarbyUtils 
{
    commandsFile = "./commands/commandJs.txt"; 
    runOnce = false;

    constructor () 
    {    
    }

    async Update ()
    {
    }

    commandLog (logContent, logLabel)
    {
      const logDate = this.getDate(); 
      const logLocation = './logs/commandLog.txt';
      const stream = fs.createWriteStream(logLocation, {flags:'a'});

      stream.write(`[ ${logDate} ] ${logLabel} ${logContent}`+"\n");
      stream.end();
    }

    getDate ()
    {
      const date = new Date().toLocaleString().replace(",","").replace(/:.. /," "); 
      return date;
    }

    checkCommands ()
    {
      fs.readFile(this.commandsFile, 'utf8', (error, data) => {
        if (error) {
          this.commandLog(error, '[ CheckCommands ]');
          return;
        }

        if (data != '') {
          this.runCommand(data);
          this.commandLog(data, '[ CheckCommands ]');
          fs.writeFile(this.commandsFile, '', (error) => {
            if (error) {
              this.commandLog(error, '[ CheckCommands ]');
              return;
            }
          });
        }
      });
    }

    checkCommandList (command)
    {
      const commandList = JSON.parse(commandsList);
      const commandData = commandList[command];

      if (commandData != undefined) {
        return commandData;
      } else {
        return "Command not found";
      }
    }

    runCommand (command)
    {
      let commandName = this.checkCommandList(command);
      if (commandName == "Command not found") {
        console.log(`[ RunCommand ] ${commandName} not found.`);
        return;
      } else {
      console.log(`[ RunCommand ] ${commandName} has been executed.`);
        eval(commandName);
      }
    }
    
    shutdown ()
    { 
      console.log('[ Shutdown ] Loarby has been shutdown.');
      process.exit();
    }
}


class loarbyInitializer extends loarbyUtils 
{
      
    db_connection = {};
    token_arr = {};
    active_modules = {};
    interface_arr = {};
    folder_arr = {};
    parsed_config_data = {};
    modules_service = modules_service;

    constructor (configs, initialize = true) 
    {
      super();
      this.importConfigs(configs);
      // this.enableModules();

      if (initialize == true) {
        this.enableInterface();
      }
    }

    enableInterface () //Discord by default 
    {
      this.interface_arr.forEach(interface_data => 
      {
        if (interface_data['enabled'] == 'true' && interface_data['active'] == 'false') 
        {
          const discordBot = new loarbyCord(this.token_arr.discord);
          discordBot.attachCore(this);
        } 
        console.log(`[ EnableInterface ] ${interface_data.name} has been enabled.`);
      }); 
    }


    importConfigs (configs) 
    {
      let config_data = fs.readFileSync("config.json", 'utf8');
      this.parsed_config_data = JSON.parse(config_data);
      this.token_arr = this.parsed_config_data.Constants[0].api_tokens[0];
      this.interface_arr = this.parsed_config_data.Interfaces;
      this.folder_arr = this.parsed_config_data.Constants[0].folder_locations[0];
    }


    enableModules () // make it so that modules are returned as an array of objects
    {
      this.modules_service.enableModules();
    }    
}

export { loarbyInitializer };
