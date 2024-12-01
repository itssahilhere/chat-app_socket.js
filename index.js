import { connecttomongoose } from './config/mongoose.config.js';
import {server} from './server.js';
server.listen(3000, () => {
    console.log("Listening on port 3000");
    connecttomongoose();
});