const mainInitializer = require("../main.ts"); 

export default class modulesService extends mainInitializer {
   
    contructor() {
       this.banana = "banana";
       return this;
    }
} 

const modules_service = new modulesService();
