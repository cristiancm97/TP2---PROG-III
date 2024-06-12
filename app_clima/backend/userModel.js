const mongoose = require('mongoose');
const busquedaSchema = new mongoose.Schema(
    {
      city: {
        type: String
      },
      country: {
        type: String
      },
      temp: {
        type: Number
      },
      conditionText: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now        
      }
    
    }
)

const Busqueda = mongoose.model("Busqueda", busquedaSchema);
module.exports = Busqueda;