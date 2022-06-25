//Entry point + Initializer 
import modulesService from "./modules/modules_service.ts";

class mainInitializer {
      fs = require('fs');
      config_file = this.fs.readFileSync('config.json'); 
     //db_connection = {};
     //tokens_arr = {};
      active_modules = {};

    constructor() {
         this.config_data = JSON.parse(this.config_file);
         this.token_arr = this.config_data.Constants.api_tokens;
         this.modules_arr = this.config_data.Modules;
         this.root_folder = this.config_data.Constants.folder_locations;
        return this; 
    }

    enableModules() {
      this.modules_service = require('./modules/modules_service.ts');
      this.modules_service = new this.modules_service();
      console.log(this.modules_service); 
    }    
}

module.exports = mainInitializer; 
const mainEntryPoint = new mainInitializer();
mainEntryPoint.enableModules()
