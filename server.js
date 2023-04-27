require("dotenv").config();
const app = require('./app');
const { db } = require('./database/config.js');

//Autenticación con la Bse de datos
db.authenticate()
    .then(() =>
        console.log('DataBase Authenticated!')
    )
    .catch(
        (error) => console.log(error)
    );
//Sincronización con la base de datos.
// db.sync({ force: true })  Forzar la base de datos.
db.sync()
    .then(() => console.log('DataBase Synced'))
    .catch(
        (error) => console.log(error)
    );

const port = 3000;
app.listen(port, () => {
    console.log(`App on port ${port}..`);
})