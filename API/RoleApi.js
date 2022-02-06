const express = require('express');
const { GetRoles, GetRole, AddRole, 
    UpdateRoleByRoleId, DeleteRoleByRoleId } = require('../Controllers/RoleController')



let RoleRouter = express.Router(); 

//roleRouter Get All roles route
RoleRouter.get('/', (req, res) => {
    GetRoles(results => {
        res.json(results);
    }); 
})
//roleRouter Get one role route
RoleRouter.get('/:id', (req, res) => {
    GetRole(req.params.id, result => {
        res.json(result);
    })
})

//roleRouter create a role route
RoleRouter.post('/', (req, res)=> {
    AddRole(req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//roleRouter update a role by id route
RoleRouter.put('/:id', (req, res) => {
    UpdateRoleByRoleId(req.params.id, req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//roleRouter delete a role by id route
RoleRouter.delete('/:id', (req, res) => {
    DeleteRoleByRoleId(req.params.id, result => {
    if (result && result.success)
        res.status(200).json(result);
    else
        res.status(400).json(result);
    })
})


module.exports = RoleRouter;