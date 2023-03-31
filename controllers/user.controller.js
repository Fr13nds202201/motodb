const User = require('./../models/users.models');

exports.findOne = (req, res) => {
    res.status(200).json({
        ok: true,
    });
}

exports.findAll = (req, res) => {
    res.status(200).json({
        ok: true,
    });
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
        })
    }
};

exports.update = (req, res) => {
    res.status(201).json({
        ok: true,
    });
};
exports.delete = (req, res) => {
    res.status(201).json({
        ok: true,
    });
};