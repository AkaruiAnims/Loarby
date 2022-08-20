//Entry point + Initializer 
import { modules_service } from "./modules/modules_service.js";
import * as fs from 'fs/promises';

let config_file = fs.readFile('config.json', 'utf8');

export class mainInitializer {
      
     //db_connection = {};
     //tokens_arr = {};
     //active_modules = {};

    constructor() {
         
    }

    importConfigs(config_data) {
      this.config_data = JSON.parse(this.config_file);
      this.token_arr = this.config_data.Constants.api_tokens;
      this.modules_arr = this.config_data.Modules;
      this.root_folder = this.config_data.Constants.folder_locations;
      return this;
    }

    enableModules() {
      //this.modules_service = require('./modules/modules_service.ts');
      this.modules_service = new modules_service();
      console.log(this.modules_service); 
    }    
}

const mainEntryPoint = new mainInitializer();
mainEntryPoint.enableModules()
