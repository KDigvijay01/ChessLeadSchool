console.log("Starting app.js");
const express = require('express');
const bodyParser = require('body-parser');
const router=require('./routes/index');
const app=express();


app.use(bodyParser.json());

/*fetching routes using router */
app.use('/', router);



const port=process.env.PORT || 4000

/*listening on port 4000 */
app.listen(port, () => {
    console.log(`App LIstening TO Port No ${port}....`)

});
