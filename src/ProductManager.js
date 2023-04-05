import fs from 'fs';

const path = './src/files/BD.json';

export default class ProductManager {

    getProducts = async() =>{

        if(fs.existsSync(path)){
            const data = await fs.promises.readFile(path, 'utf-8');
            const users = JSON.parse(data);
            return users;
        }else {
            return [];
        }
    }
    getProduct = async(id) =>{
        const products = await this.getProducts();
        
        const product = products.filter((product)=>{
            return product.id == id
        })

        return product

    }
    eliminarProducto = async(id) =>{
        
        const products = await this.getProducts();
        const productIndex = products.findIndex((product)=>{
            return product.id == id
        })
        products.splice(productIndex,1)

        try {
            await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
            return 'Producto eliminado'
        } catch (error) {
             return error   
        }

        
    }
    crearProducto = async(product) =>{
        const products = await this.getProducts();

        //console.log(usuarios[usuarios.length-1]);
        let id = products[products.length-1].id ;


        product.id = ++id;
        products.push(product)

        try {
            await fs.promises.writeFile(path, JSON.stringify(usuarios,null,'\t'))
            return 'Producto creado'
        } catch (error) {
             return error   
        }


    }
    
    modificarProducto = async(id, nombre,description,prince,categoria)=>{

        const products = await this.getProducts();

        const productIndex = products.findIndex((product)=>{
            return product.id == id
        })

        products[productIndex].nombre = nombre;
        products[productIndex].description = description;
        products[productIndex].prince = prince;
        products[productIndex].categoria = categoria;

        try {
            await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'))
            return 'products modificado'
        } catch (error) {
             return error   
        }

    }



}