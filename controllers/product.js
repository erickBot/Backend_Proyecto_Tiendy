const express = require('express');
const Product = require ('../models/product');

module.exports = {

    async getAll(req, res){
    
        try{
            const products = await Product.find();
    
            res.status(200).json({
                data: products,
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener los productos',
                success: false
            });
        }
    
    },

    async getByIdCategory(req, res){
    
        try{
            const idCategory = req.params.id_category;
            const products = await Product.findOne({idCategory});
    
            res.status(200).json({
                data: products,
                success: true
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener los productos',
                success: false
            });
        }
    
    },

    async create (req, res){
        try{

            const { name, description, ...body} = req.body;
            //validar si existe 
            const myProduct = await Product.findOne({ name });
            
                if (myProduct){
                    return res.status(400).json({
                        msg: `El producto ${ myCategory.name }, ya existe`,
                        success: false
                    })
                }

            //preparar la data a guardar
            const data = {
                     ...body, name, description
            }
     
            const newProduct = new Product( data );
            //almacenar en Mongo DB
            await newProduct.save();

            res.status(201).json({
                msg: 'Producto creado con exito',
                success: true
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al crear producto',
                error: err,
                success: false
            });
        }
    },

     async update (req, res){
        try{
    
            const id  = req.params.id;
            const body = req.body;
            //actualizar en Mongo DB
            const producto = await Product.findByIdAndUpdate( id, body, {new: true} );
    
            res.status(201).json({
                msg: 'Prodcuto fue actualizado correctamente',
                success: true,
                data: producto
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al actualizar producto',
                success: false
            });
        }
    },

     async delete (req, res){
            try{
                const id  = req.params.id;
        
                const product = await Product.findByIdAndDelete(id);
        
                res.status(201).json({
                    msg: 'Producto eliminado correctamente',
                    success: true
                });
        
            }catch(err){
                console.log(err);
                return res.status(400).json({
                     msg: 'Ocurrio un error al eliminar producto',
                     success: false
                });
            }
        },
}