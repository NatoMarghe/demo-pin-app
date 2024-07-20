const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "demo-pin-app", version: "1.0.0"},
    },
    apis: ["index.js", "./routers/cliente.js", "./routers/kpi.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app, port) => {
    app.use('/swagger', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
};

module.exports = { swaggerDocs };