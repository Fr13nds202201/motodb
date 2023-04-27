const catchAsync = require('./../utils/catchAsync');

exports.protects = catchAsync((req, res, next) => {
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

    const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED);
});