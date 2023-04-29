const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/users.models');

exports.protects = catchAsync(async (req, res, next) => {
    //extraer token
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    //validar token
    if (!token) {
        return next(
            new AppError('You are not logged in, log in', 401)
        );
    }
    console.log(token);

    //decodificar el jwt
    const decoded = await promisify(jwt.verify)(
        token,
        process.env.SECRET_JWT_SEED
    );

    const user = await User.findOne({
        where: {
            id: decoded.id,
            status: 'available',
        },
    });

    if (!user) {
        return next(
            new AppError('The owner of this token it not longer available', 401)
        )
    };

    req.sessionUser = user;
    next();
});