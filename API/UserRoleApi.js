const express = require('express');
const { GetUserRoles, GetUserRole, AddUserRole, 
    UpdateUserRoleByUserRoleId, DeleteUserRoleByUserRoleId,
    GetUserRolesByUserId, DeleteAllUserRolesByUserId } = require('../Controllers/UserRoleController')



let UserRoleRouter = express.Router(); 

//userRoleRouter Get All users route
UserRoleRouter.get('/', (req, res) => {
    GetUserRoles(results => {
        res.json(results);
    }); 
})
//userRouter Get one user route
UserRoleRouter.get('/:id', (req, res) => {
    GetUserRole(req.params.id, result => {
        res.json(result);
    })
})

//userRouter Get one user route
UserRoleRouter.get('/user/:id', (req, res) => {
    GetUserRolesByUserId(req.params.id, result => {
        res.json(result);
    })
})

//userRouter create a user route
UserRoleRouter.post('/', (req, res)=> {
    AddUserRole(req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//userRouter update a user by id route
UserRoleRouter.put('/:id', (req, res) => {
    UpdateUserRoleByUserRoleId(req.params.id, req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//userRouter delete a user by id route
UserRoleRouter.delete('/:id', (req, res) => {
    DeleteUserRoleByUserRoleId(req.params.id, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
        })
})

UserRoleRouter.delete('/user/:id', (req, res) => {
    DeleteAllUserRolesByUserId(req.params.id, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
        })
})



module.exports = UserRoleRouter;