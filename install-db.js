'use strict';

require('dotenv').config();

const connect = require('./lib/connectMongo');
const state = require('./models/state');

connect.once('open', async () => {
    try {
        await initState();
        console.log("Import taks complete");
        connect.close();
    } catch (err) {
        console.error('Hubo un error: ', err)
        process.exit(1);
    }
});

async function initState() {
    await state.deleteMany();
    await state.insertMany([
        {"provincia": "Albacete" },
        {"provincia": "Alicante/Alacant" },
        {"provincia": "Almería" },
        {"provincia": "Asturias" },
        {"provincia": "Araba/Álava" },
        {"provincia": "Ávila" },
        {"provincia": "Badajoz" },
        {"provincia": "Balears, Illes" },
        {"provincia": "Barcelona" },
        {"provincia": "Bizkaia" },
        {"provincia": "Burgos" },
        {"provincia": "Cáceres" },
        {"provincia": "Cádiz" },
        {"provincia": "Cantabria" },
        {"provincia": "Castellón/Castelló" },
        {"provincia": "Ciudad Real" },
        {"provincia": "Córdoba" },
        {"provincia": "Coruña, A" },
        {"provincia": "Cuenca" },
        {"provincia": "Gipuzkoa" },
        {"provincia": "Girona" },
        {"provincia": "Granada" },
        {"provincia": "Guadalajara" },
        {"provincia": "Huelva" },
        {"provincia": "Huesca" },
        {"provincia": "Jaén" },
        {"provincia": "León" },
        {"provincia": "Lleida" },
        {"provincia": "Lugo" },
        {"provincia": "Madrid" },
        {"provincia": "Málaga" },
        {"provincia": "Murcia" },
        {"provincia": "Navarra" },
        {"provincia": "Ourense" },
        {"provincia": "Palencia" },
        {"provincia": "Palmas, Las" },
        {"provincia": "Pontevedra" },
        {"provincia": "Rioja, La" },
        {"provincia": "Salamanca" },
        {"provincia": "Santa Cruz de Tenerife" },
        {"provincia": "Segovia" },
        {"provincia": "Sevilla" },
        {"provincia": "Soria" },
        {"provincia": "Tarragona" },
        {"provincia": "Teruel" },
        {"provincia": "Toledo" },
        {"provincia": "Valencia/València" },
        {"provincia": "Valladolid" },
        {"provincia": "Zamora" },
        {"provincia": "Zaragoza" }
    ]);
}