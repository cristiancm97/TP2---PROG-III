const express = require('express')
const cors = require('cors')
const Busqueda = require('./userModel')
const dbconnect = require('./config')
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json({type:"*/*"}))
app.use(cors())

app.post("/api/clima", (req,res) => {
   const historial = req.body;
   console.log('me llego un post') 
   console.log(historial) 
   const datosBusqueda = Busqueda.create(historial)
   res.send(datosBusqueda)
})

app.listen(3001,() => {
    console.log("El servidor esta en el puerto 3001")
})

dbconnect();