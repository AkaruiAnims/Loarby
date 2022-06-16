//Entry point + Initializer 

class mainInitializer {
      fs = require('fs');
      config_file = this.fs.readFileSync('config.json'); 
     //db_connection = {};
     //tokens_arr = {};
     //modules_arr = {};

    constructor() {
         this.config_data = JSON.parse(this.config_file);
         this.token_arr = this.config_data.Constants.api_tokens;
         this.modules_arr = this.config_data.Modules;
         this.root_folder = this.config_data.Constants.folder_locations;
        return this; 
    }

}

const main = new mainInitializer();
console.log(main.config_data);
