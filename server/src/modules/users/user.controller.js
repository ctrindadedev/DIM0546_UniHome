const userService = require('./user.service');

const create = async (req, res) => {
    const user = await userService.createUser(req.body, req.id);
    res.status(201).json({ success: true, data: user });
};

const getAll = async (req, res) => {
    const users = await userService.getUsers(req.id);
    res.status(200).json({ success: true, data: users });
};

const getById = async (req, res) => {
    const user = await userService.getUserById(req.params.id, req.id);
    res.status(200).json({ success: true, data: user });
};

const update = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body, req.id);
    res.status(200).json({ success: true, data: user });
};

const remove = async (req, res) => {
    const result = await userService.deleteUser(req.params.id, req.id);
    res.status(200).json({ success: true, data: result });
};

const getMe = async (req, res) => {
    const user = await userService.getCurrentUser(req.id);
    res.status(200).json({ success: true, data: user });
};

const updateMe = async (req, res) => {
    const user = await userService.updateCurrentUser(req.body, req.id);
    res.status(200).json({ success: true, data: user });
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    getMe,
    updateMe
};
