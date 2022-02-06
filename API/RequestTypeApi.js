const express = require('express');
const { GetRequestType, GetRequestTypes, AddRequestType, 
    UpdateRequestTypeByTypeId, DeleteRequestTypeByTypeId } = require('../Controllers/RequestTypeController')



let RequestTypeRouter = express.Router(); 

//RequestTypeRouter Get All users route
RequestTypeRouter.get('/', (req, res) => {
    GetRequestTypes(results => {
        res.json(results);
    }); 
})
//RequestTypeRouter Get one user route
RequestTypeRouter.get('/:id', (req, res) => {
    GetRequestType(req.params.id, result => {
        res.json(result);
    })
})

//RequestTypeRouter create a user route
RequestTypeRouter.post('/', (req, res)=> {
    AddRequestType(req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//RequestTypeRouter update a user by id route
RequestTypeRouter.put('/:id', (req, res) => {
    UpdateRequestTypeByTypeId(req.params.id, req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//RequestTypeRouter delete a user by id route
RequestTypeRouter.delete('/:id', (req, res) => {
    DeleteRequestTypeByTypeId(req.params.id, result => {
    if (result && result.success)
        res.status(200).json(result);
    else
        res.status(400).json(result);
    })
})

//TODO: Update user by username
//TODO: Get user by username
//TODO: Add user with duplicate username (add _1 to username)

module.exports = RequestTypeRouter;