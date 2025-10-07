//Entry point + Initializer 
import { modules_service } from "./modules/modules_service.js";
import * as fs from 'fs';
import { loarbyCord } from "./interfaces/discord/js/loarbyCord.js";

// const commandsList = fs.readFileSync('./constants/commandsList.json', 'utf8'); // probably don't need this

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

    getDate ()
    {
      const date = new Date().toLocaleString().replace(",","").replace(/:.. /," "); 
      return date;
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
    active_interfaces = {};
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
          this.active_interfaces[interface_data['name']] = new loarbyCord(interface_data.token);
          this.active_interfaces[interface_data['name']].attachCore(this);
        } 
        console.log(`[ EnableInterface ] ${interface_data.name} has been enabled.`);
      }); 
    }

    disableInterface ( interfaceName )
    {

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
