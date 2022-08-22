//Entry point + Initializer 
import { modules_service } from "./modules/modules_service.js";
import { exec } from "child_process";
import * as fs from 'fs';

let config_file = fs.readFileSync('config.json', 'utf8');

class mainInitializer {
      
     db_connection = {};
     token_arr = {};
     active_modules = {};
     interface_arr = {};
     folder_arr = {};
     active_interface;

    constructor(configs) {
      this.importConfigs(configs).enableInterface();
    }

    enableInterface () {
      this.interface_arr.forEach(interface_data => {
        if (interface_data['enabled'] == 'true') {
          let interfaceModule = import(`./interfaces/${interface_data.location}/${interface_data.entry_point}`);
          console.log(`test: ./interfaces/${interface_data.location}/${interface_data.entry_point}`);
          console.log(`test-2: ${interfaceModule}`);
          this.active_interface = new interfaceModule(interface_data.token);
         //exec(`node ./interfaces/${interface_data.location}/${interface_data.entry_point} ${interface_data.token}`).unref();
         //   , (error, stdout, stderr) => {
         //    if (error) {
         //        console.log(`error: ${error.message}`);
         //        return;
         //    }
         //    if (stderr) {
         //        console.log(`stderr: ${stderr}`);
         //        return;
         //    }
         //    console.log(`stdout: ${stdout}`);
         // }); 
        }
      });  
    }

    importConfigs (config_data) {
      this.parsed_config_data = JSON.parse(config_data);
      this.token_arr = this.parsed_config_data.Constants.api_tokens;
      this.interface_arr = this.parsed_config_data.Interfaces;
      this.folder_arr = this.parsed_config_data.Constants.folder_locations;
      return this;
    }

    enableModules (tokens_array) {
      this.modules_service
    }    
}

export const mainEntryPoint = new mainInitializer(config_file);
