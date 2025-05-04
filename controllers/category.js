const express = require('express');
const Category = require ('../models/category');

module.exports = {

    async getAll(req, res){

        try{
            const categories = await Category.find();

            res.status(200).json({
                data: categories
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al obtener las categorias'
            });
        }

    },

    async create (req, res){
        try{

            const { name, description } = req.body;
            //validar si existe el nombre de la categoria
            const myCategory = await Category.findOne({ name });

            if (myCategory){
                return res.status(400).json({
                    msg: `La categoria ${ myCategory.name }, ya existe`
                })
            }
            //preparar la data a guardar
            const data = {
                name, description
            }

            const newCategory = new Category( data );
            //almacenar en Mongo DB
            await newCategory.save();

            res.status(201).json({
                msg: 'Categoria creada con exito',
                data: newCategory
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al crear categoria'
            });
        }
    },

    async update (req, res){
        try{

            const id  = req.params.id;
            const body = req.body;
            //actualizar en Mongo DB
            const category = await Category.findByIdAndUpdate( id, body, {new: true} );

            res.status(201).json({
                msg: 'Categoria fue actualizada correctamente',
                data: category
            });

        }catch(err){
            console.log(err);
            return res.status(400).json({
                msg:'Ocurrio un error al actualizar categoria'
            });
        }
    },

    async delete (req, res){
        try{
            const id  = req.params.id;
    
            const category = await Category.findByIdAndDelete(id);
    
            res.status(201).json({
                msg: 'Categoria eliminada correctamente'
            });
    
        }catch(err){
            console.log(err);
            return res.status(400).json({
                 msg: 'Ocurrio un error al eliminar categoria'
            });
        }
    },
}