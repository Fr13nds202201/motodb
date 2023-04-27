const User = require('./../models/users.models');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email.toLowerCase(),
            status: 'available',
        },
    });

    if (!user) {
        return next(new AppError('the user could not be found', 404));
    }
    // //3 validar si la contraseña es correcta
    if (!(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Incorrect email or password', 404));
    }
    //4 Generar el jsonwebtoken

    const token = await generateJWT(user.id);
    //5 enviar la respueta al cliente

    res.status(200).json({
        status: 'success',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
});