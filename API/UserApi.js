const express = require('express');
const { GetUsers, GetUser, AddUser, 
    UpdateUserByUserId, DeleteUserByUserId } = require('../Controllers/UserController')



let UserRouter = express.Router(); 

//userRouter Get All users route
UserRouter.get('/', (req, res) => {
    GetUsers(results => {
        res.json(results);
    }); 
})
//userRouter Get one user route
UserRouter.get('/:id', (req, res) => {
    GetUser(req.params.id, result => {
        res.json(result);
    })
})

//userRouter create a user route
UserRouter.post('/', (req, res)=> {
    AddUser(req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//userRouter update a user by id route
UserRouter.put('/:id', (req, res) => {
    UpdateUserByUserId(req.params.id, req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//userRouter delete a user by id route
UserRouter.delete('/:id', (req, res) => {
    DeleteUserByUserId(req.params.id, result => {
    if (result && result.success)
        res.status(200).json(result);
    else
        res.status(400).json(result);
    })
})

//TODO: Update user by username
//TODO: Get user by username
//TODO: Add user with duplicate username (add _1 to username)

module.exports = UserRouter;