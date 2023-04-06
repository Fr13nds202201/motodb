const User = require('./../models/users.models');

exports.findOneUser = async (req, res) => {
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
};

exports.findAllUsers = async (req, res) => {
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
};

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const user = await User.create({
            name, email, password
        });
        res.status(201).json({
            status: 'SUCCESS',
            message: 'User created successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Something wen very wrong',
        });
    }
};

exports.updateUser = async (req, res) => {
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
};

exports.delete = async (req, res) => {
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
};