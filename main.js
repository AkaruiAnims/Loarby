//Entry point + Initializer 
import { modules_service } from "./modules/modules_service.js";
import * as fs from 'fs';

let config_file = fs.readFileSync('config.json', 'utf8');

class mainInitializer {
      
     db_connection = {};
     token_arr = {};
     active_modules = {};
     interface_arr = {};
     folder_arr = {};

    constructor(configs) {
      this.importConfigs(configs);
      this.enableInterface();
    }

    enableInterface () {
      
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
