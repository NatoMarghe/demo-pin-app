const express = require("express");

const {calculateStandardDeviation, calculateAverage} = require("../helpers/utils");

const routerApiCliente = express.Router();
routerApiCliente.use(express.json());

const dataDB = require("../db/data.json");

const AVERAGE_LIFE_YEARS = process.env.AVERAGE_LIFE_YEARS || 85;

/**
 * @openapi
 * /api/pinapp/cliente/creacliente:
 *   post:
 *     summary: Inserta un nuevo cliente
 *     requestBody: 
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          apellido:
 *                              type: string
 *                          nombre:
 *                              type: string
 *                          edad:
 *                              type: number
 *                          fecha_nacimiento:
 *                              type: string
 *          required: true
 *     tags:
 *       - Crea Cliente
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
 routerApiCliente.post("/creacliente", (req, res) => {
    let clienteNuevo = req.body;
    dataDB.clientes.push(clienteNuevo);
    res.send(dataDB);
});

/**
 * @openapi
 * /api/pinapp/cliente/listclientes:
 *   get:
 *     summary: Retorna todos los datos de los clientes con la probable fecha de muerte
 *     tags:
 *       - Listado de clientes
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
 routerApiCliente.get("/listclientes", (req, res) => {
     const data = [];
     dataDB.clientes.forEach((cliente) => {
         const fecha_nacimiento = new Date(cliente.fecha_nacimiento)
         const ano_muerte = new Date(cliente.fecha_nacimiento);
         ano_muerte.setFullYear(fecha_nacimiento.getFullYear() + AVERAGE_LIFE_YEARS);

         const newItem = {
            apellido: cliente.apellido,
            nombre: cliente.nombre,
            edad: cliente.edad,
            fecha_nacimiento: cliente.fecha_nacimiento,
            fecha_muerte: ano_muerte.toLocaleDateString()
         }

         data.push(newItem);
     });
    res.send(data);
});

module.exports = routerApiCliente;