const User = require('../models/user');
const List = require('../models/list');
const HttpError = require('../models/httpError');
const { validationResult } = require('express-validator');

const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new HttpError('Invalid inputs passed', 422);
        }

        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) {
            throw new HttpError('Invalid credentials', 401); 
        }

        // Remove password from response
        const userObj = user.toJSON();
        delete userObj.password;

        res.status(200).json({
            message: "Login successful",
            user: userObj
        });

    } catch (err) {
        next(new HttpError(err.message || 'Login failed', err.code || 500));
    }
};

const getAllLists = async (req, res, next) => {
    try {
        const userId = req.params.cid;

        const user = await User.findByPk(userId, { include: List });
        if (!user) {
            throw new HttpError('User not found', 404);
        }

        res.status(200).json({
            message: "Found your lists",
            lists: user.Lists || []
        });

    } catch (err) {
        next(new HttpError(err.message || 'Could not get lists', err.code || 500)); 
    }
};

const createNewList = async (req, res, next) => {
    try {
        const { userID, items } = req.body;

        const user = await User.findByPk(userID);
        if (!user) {
            throw new HttpError('User not found', 404);
        }

        const newList = await List.create({
            items,
            customer: userID,
            listGeneratedAt: new Date()
        });

        // If you have associations set up, you can use addList
        // await user.addList(newList);

        res.status(201).json({
            message: "New List created",
            list: newList
        });

    } catch (err) {
        next(new HttpError(err.message || 'Creating list failed', err.code || 500));
    }
};

exports.login = login;
exports.getAllLists = getAllLists; 
exports.createNewList = createNewList;