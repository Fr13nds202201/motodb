const repairs = require('./../models/repairs.models');

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const { userId } = req.body;
        const user = await repairs.create({ userId });
        res.status(201).json({
            status: 'SUCCESS',
            message: 'userid created successfully',
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            status: 'Fail',
            message: "Something wen very wrong",
        });

    }
}

exports.findAllRepairs = async (req, res) => {
    const { requestTime } = req;
    const repairsUsers = await repairs.findAll({
        where: {
            status: "pending"
        }
    });

    res.status(200).json({
        status: 'pending',
        message: 'The query has been done successfully',
        requestTime,
        result: repairsUsers.length,
        repairsUsers,
    });
};

exports.findOneReparirs = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const repairsId = await repairs.findOne({
        where: {
            id,
            status: "pending",
        },
    });

    if (!repairsId) {
        res.status(404).json({
            status: "fail",
            message: `the reparis ${id} is not found`,
        });
    }


    res.status(200).json({
        status: "success",
        message: " the find repairs is successfuly",
        repairsId,
    });
}
exports.updateRepairs = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const repairsId = await repairs.findOne({
        id,
        status: "pending",
    });

    if (!repairsId) {
        res.status(404).json({
            status: "fail",
            message: "the repairs is no found",

        });
    }

    await repairsId.update({
        status,
    });
    console.log(repairs);
    res.status(201).json({
        status: "success",
        message: "The produc has been update",
    });
}
exports.deleteRepairs = async (req, res) => {
    const { id } = req.params;

    const repair = await repairs.findOne({
        where: {
            id,
            status: "pending"
        },
    });

    await repair.update({ status: "cancelled" });
    res.status(200).json({
        status: "success",
        message: "the repairs was deleted"
    });
}