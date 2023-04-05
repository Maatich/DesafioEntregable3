import express from 'express';
import ProductManager from './Managers/ProductManager.js';

const PORT = 8080;

const productManager = new ProductManager()
const app = express();

app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    //console.log(`Servidor funcionando en el puerto ${ PORT }`)
    console.log('Servidor funcionando en el puerto: ' + PORT)
})

const products = [
    {id:'1',nombre:'Diseño',description:'ejemplo',categoria:'F'},
    {id:'2',nombre:'MySql',description:'ejemplo',genero:'F'},
    {id:'3',nombre:'PHP',description:'ejemplo',genero:'M'},
    {id:'4',nombre:'Backups',description:'ejemplo',genero:'F'},
    {id:'5',nombre:'Dominios',description:'ejemplo',genero:'M'},
    {id:'6',nombre:'FrondEnd',description:'ejemplo',genero:'M'}
]

app.get('/', async (req,res)=>{
    
})

app.get('/products', async (req,res)=>{
    const products = await productManager.getProducts();
    res.send(products)
})

app.get('/products/:id', async (req,res)=>{

    const categoria = req.query.categoria;
    if(!categoria || (categoria!=='M' && categoria!=='F')){
       return res.send({
            products
         })
    }
    let productsFilter = products.filter(prod => prod.categoria === categoria );
    res.send({
        products: productsFilter
    })


})

app.get('/eliminar/:id', async (req,res)=>{

    const id = req.params.id;

    const msg = await productManager.eliminarProducto(id);
    res.send(msg)
    
})

app.get('/newquery', async (req,res)=>{

    const {nombre, description, prince, categoria } = req.query;

    if(!nombre || !description || !prince || !categoria ){
        res.send('Faltan datos')
        return
    }
    const product = {
        nombre, description,prince, categoria
    }
    const msg = await productManager.crearProducto(product);

    res.send(msg)

})


app.get('/editquery', async (req,res)=>{

    const {id, nombre, description, prince, categoria } = req.query;

    if(!nombre || !description || !prince || !categoria || !id ){
        res.send('Faltan datos')
        return
    }

    const msg = await productManager.modificarProducto(id, nombre,description,prince,categoria);

    res.send(msg)

})
