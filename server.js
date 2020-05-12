const express = require('express');

const app = express();
const port = process.env.PORT || 8080

// Serves static files from root directory
app.use(express.static('./'));
app.listen(port,()=>{console.log("Listening at localhost:"+port)});
