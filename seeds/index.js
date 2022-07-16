const mongoose = require('mongoose')
const ciudades = require('./ciudades')
const Campground = require('../models/campground')
const {nombres, descripciones} = require('./seeds')

mongoose.connect('mongodb://localhost:27017/app',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión'))
db.once('open',()=>{
    console.log('Base de datos conectada')
})

const muestra = arr => arr[Math.floor(Math.random()*arr.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i<5; i++){          
        const camp  = new Campground({
        location: `${ciudades[i].ciudad}, ${ciudades[i].estado} `,
        title: `${muestra(nombres)}`,
        description: `${muestra(descripciones)}`     
    })
    await camp.save()
}
}    
 
seedDB().then(() => mongoose.connection.close())

