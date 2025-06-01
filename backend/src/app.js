import app from "./sever.js";
import connection from "./config/database.mjs";

connection();

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});