import { loarbyInitializer } from "./loarbyCore.js";

class loarbyCommandHandler extends loarbyInitializer 
{
    constructor (configs) 
    {
        super(configs);
    }
}
export const loarbCore = new loarbyCommandHandler("config.json");