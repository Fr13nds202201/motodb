const User = require('./../models/users.models');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');


exports.create = catchAsync(async (req, res, next) => {

    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: encryptedPassword,
    });

    const token = await generateJWT(user.id);

    res.status(201).json({
        status: 'SUCCESS',
        message: 'User created successfully',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
});

exports.findOneUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const user = await User.findOne({
        where: {
            id,
            status: 'available',
        },
    });

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: `User whith id: ${id} not found`,
        });
    }

    res.status(200).json({
        status: 'successs',
        messge: 'the user find is successful',
        user,
    });
});

exports.findAllUsers = catchAsync(async (req, res) => {
    const { requestTime } = req;
    const users = await User.findAll();

    res.status(200).json({
        status: 'success',
        message: 'The query has been done successfully',
        requestTime,
        results: users.length,
        users,
    });
    console.log(users);
});

exports.updateUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, status } = req.body;
    const user = await User.findOne({
        id,
        status: 'available',
    });

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found',
        });
    }

    await user.update({
        name,
        email,
        password,
        role,
        status
    });
    console.log(user);
    res.status(200).json({
        status: 'success',
        message: 'The user has been update',
    });
});

exports.delete = catchAsync(async (req, res) => {
    //Traer el id del req.params
    const { id } = req.params;

    //Buscar el producto a actualizar 
    const user = await User.findOne({
        where: {
            id,
            status: 'available'
        },
    })

    //Validar si el producto existe, sino enviar error
    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'Product whith id: ${id} not found',
        });
    }

    //Utilizar un user.update y van actualizar solo el estado a false
    await user.update({ status: 'Disabled' });
    // await user.destroy();
    //validar si el producto existe
    res.status(200).json({
        status: 'success',
        message: 'The user has ben deleted',
    });
});


exports.validIfExistUser = catchAsync(async (req, res, next) => {

    try {
        const { id } = req.params;

        const user = await User.findOne({
            where: {
                id,
                status: 'available',
            },
        });

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went very wrong',
            error,
        });
    }
});