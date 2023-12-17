//Entry point + Initializer 
import { modules_service } from "./modules/modules_service.js";
import { exec } from "child_process";
import * as fs from 'fs';

const config_file = fs.readFileSync('config.json', 'utf8');


class loarbyUtils 
{
    //make a getDate method
    constructor () 
    {    
      return this;
    }

    commandLog (logContent, logLabel)
    {
      const logDate = new Date().toLocaleString().replace(",","").replace(/:.. /," "); 
      const logLocation = './logs/commandLog.txt';
      const stream = fs.createWriteStream(logLocation, {flags:'a'});

      stream.write(`[ ${logDate} ] ${logLabel} ${logContent}`+"\n");
      stream.end();

      return this;
    }

}


class mainInitializer extends loarbyUtils 
{
      
    db_connection = {};
    token_arr = {};
    active_modules = {};
    interface_arr = {};
    folder_arr = {};
    parsed_config_data = {};
    modules_service = modules_service;


    constructor (configs) 
    {
      super();
      this.importConfigs(configs).enableInterface();
      //this.enableModules();
    }


    enableInterface () 
    {
      this.interface_arr.forEach(interface_data => {
        if (interface_data['enabled'] == 'true' && interface_data['active'] == 'false') {

          if (interface_data['launch_type'] == 'node') {
            exec(`node ./interfaces/${interface_data.location}/${interface_data.entry_point} ${interface_data.token}`, (error) => {
              if (error) {
                this.commandLog(error, '[ EnableInterface ]')
                return;
              }
            }); 
          } else if (interface_data['launch_type'] == 'python') {
            // console.log(`python ./interfaces/${interface_data.location}/${interface_data.entry_point} "${interface_data.token}"`);
            exec(`python ./interfaces/${interface_data.location}/${interface_data.entry_point} "${interface_data.token}"`, (error) => {
              if (error) {
                this.commandLog(error, '[ EnableInterface ]')
                return;
              }
            });
          }
        }
        
      });  
    }


    importConfigs (config_data) 
    {
      this.parsed_config_data = JSON.parse(config_data);
      this.token_arr = this.parsed_config_data.Constants.api_tokens;
      this.interface_arr = this.parsed_config_data.Interfaces;
      this.folder_arr = this.parsed_config_data.Constants.folder_locations;
      return this;
    }


    enableModules () 
    {
      this.modules_service.enableModules();
    }    
}


export const mainEntryPoint = new mainInitializer(config_file);
export const loarbUtils = new loarbyUtils();
