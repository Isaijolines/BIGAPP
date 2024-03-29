const mongoose = require('mongoose')
const ciudades = require('./ciudades')
const Campground = require('../models/campground')
const {places, descriptors} = require('./seeds')

mongoose.connect('mongodb://localhost:27017/campgrounds',{
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
    for (let i = 0; i<50; i++){          
        const rndm = Math.floor(Math.random()*1000 + 1)
        const camp  = new Campground({
        author: '6317d248e8ff198e0e87e2df',    
        location: `${ciudades[rndm].city}, ${ciudades[rndm].state} `,
        title: `${muestra(descriptors)} ${muestra(places)}`, 
        images:[{
            url: 'https://res.cloudinary.com/dv5x8ia6k/image/upload/v1663276871/BigAppJS/Paisaje_de_la_Comarca_bcyuif.jpg',
            filename:'BigAppJS/Paisaje_de_la_Comarca_bcyuif'
        },
    {
        url:'https://res.cloudinary.com/dv5x8ia6k/image/upload/v1663276658/BigAppJS/d6f95c1813dd4c681c8c796a956fd9a5_bojbr1.jpg',
        filename: 'BigAppJS/d6f95c1813dd4c681c8c796a956fd9a5_bojbr1'
    }],
        description: 'Descripción generica.tex', 
        price: 1/Math.random()  
    })
    await camp.save()
}}     
 
seedDB().then(() => {
mongoose.connection.close()
})

