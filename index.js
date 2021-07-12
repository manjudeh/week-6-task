const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 4000
let products = require('./Product')
const app = express();

app.use(express.json());


//to get products
app.get('/', (req, res) => res.json(products))
app.get('/products', (req, res) => res.json(products))
console.log(products);

// to post a product
app.post('/products', (req, res) =>{
    let newProduct = req.body;
    products.push(newProduct);
    res.json(products)
});
// to update a product details
app.put('/products/:id', (req, res) =>{
    let product_id = parseInt(req.params.id);
    let body = req.body;
    let product = products.find((prod) =>prod.id === product_id);
    let index = products.indexOf(product);
    if(!product){
        res.send('Product not found')
    }else{
        let updated = {...index, ...body}
        product[index] = updated;
        res.json(products)
    }
});
//to delete a product
app.delete('/products/:id',(req, res)=>{
let product = products.filter((prod)=> prod.id !== Number(req.params.id));

    products = product;
    res.json(products);

})

app.listen(PORT , () => console.log(`server started on port ${PORT}`));