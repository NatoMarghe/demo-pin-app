const express = require("express");
const fs = require("fs");
const { swaggerDocs }  = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = ('RENDER' in process.env) ? '0.0.0.0' : 'localhost';

//Router cliente
const routerApiCliente = require("./routers/cliente");
app.use("/api/pinapp/cliente", routerApiCliente);

//Router KPIs
const routerApiKpi = require("./routers/kpi");
app.use("/api/pinapp/kpi", routerApiKpi);

app.listen(PORT, HOST, () => {
    console.log("Server listening on port 3000");
    swaggerDocs(app, PORT);
})