const express = require("express");

const routerApiKpi = express.Router();

const dataDB = require("../db/data.json");
const {calculateStandardDeviation, calculateAverage} = require("../helpers/utils");

/**
 * @openapi
 * /api/pinapp/kpi/kpideclientes:
 *   get:
 *     summary: Retorna los KPI (Promedio de edad de los cliente y la desviación estandar)
 *     tags:
 *       - KPI clientes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
 routerApiKpi.get("/kpideclientes", async (req, res) => {    
    res.send(await generarKPI(req, res));
});

async function generarKPI(req, res) {
    let promedio = await calculateAverage(dataDB);
    let desviacion = await calculateStandardDeviation(dataDB);
    console.log(`El promedio de edad de los clientes es ${promedio} años y la desviación estandar es de ${desviacion}`);

    return `El promedio de edad de los clientes es ${promedio} años y la desviación estandar es de ${desviacion}`;
}

module.exports = routerApiKpi;