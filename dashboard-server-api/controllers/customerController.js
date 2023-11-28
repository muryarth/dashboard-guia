const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * get / 
 * homepage
 */


// Home

exports.homepage = async (req, res) => {


    const messages = await req.flash('info');

    const locals = {
        title: 'NodeJs',
        description: 'Free NodeJs User Management System'
    };

    let perPage = 10;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([ { $sort: { updatedAt: -1 } } ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await Customer.countDocuments({});

        res.render('index', {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            messages
        });
    } catch (error) {
        console.log(error);
    }
}


/**
 * get / 
 * Novo cliente
 */

exports.addCustomer = async (req, res) => {

    const locals = {
        title: 'Adicionar novo cliente',
        description: 'Adiciona novo cliente no sistema'
    };

    res.render('customer/add', locals );
}
   

/**
 * post / 
 * Novo cliente
 */

exports.postCustomer = async (req, res) => {

    console.log(req.body);

    const newCustomer = new Customer ({
        nomePrimeiro: req.body.nomePrimeiro,
        sobreNome: req.body.sobreNome,
        tel: req.body.tel,
        email: req.body.email,
        detail: req.body.detail,
        
    });

    try {
        await Customer.create(newCustomer);
        await req.flash('info', 'Novo cliente cadastrado.')

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }

    
}

/**
 * view / 
 * Ver ficha do Cliente
 */

exports.viewCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne ({ _id: req.params.id})
        const locals = {
            title: 'Ficha do Cliente',
            description: 'Free NodeJs User Management System'
        };

        res.render('customer/view', {
            locals,
            customer
        })
    } catch (error) {
        console.log(error);
    }
}


/**
 * edit/ 
 * Editar ficha do Cliente
 */

exports.editCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne ({ _id: req.params.id})
        const locals = {
            title: 'Editar Cliente',
            description: 'Free NodeJs User Management System'
        };

        res.render('customer/edit', {
            locals,
            customer
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * edit/ 
 * Atualizar ficha do Cliente
 */

exports.editCustomerPost = async (req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id,{
            nomePrimeiro: req.body.nomePrimeiro,
            sobreNome: req.body.sobreNome,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            updatedAt: Date.now()
        })
        await res.redirect(`/edit/${req.params.id}`);

    } catch (error) {
        console.log(error);
    }
}

/**
 * delete/ 
 * Deletar ficha do Cliente
 */

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.deleteOne({ _id: req.params.id });
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}

/**
 * get/ 
 * Buscar clientes
 */

exports.searchCustomers = async (req, res) => {
    
    const locals = {
        title: 'Buscar Cliente',
        description: 'Free NodeJs User Management System',
    };

    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");   
        const customers = await Customer.find({
            $or: [
                { nomePrimeiro: { $regex: new RegExp(searchNoSpecialChar, "i")}},
                { sobreNome: { $regex: new RegExp(searchNoSpecialChar, "i")}},
            ]
        });    

        res.render("search", {
            customers,
            locals
        })
    } catch (error) {
        console.log(error);
    }
}