const express = require('express');
const { GetRequestStatus, GetRequestStatuses, AddRequestStatus, 
    UpdateRequestStatusByStatusId, DeleteRequestStatusByStatusId, GetRequestStatusWithName } = require('../Controllers/RequestStatusController');




let RequestStatusRouter = express.Router(); 

//RequestStatusRouter Get All users route
RequestStatusRouter.get('/', (req, res) => {
    GetRequestStatuses(results => {
        res.json(results);
    }); 
})
//RequestStatusRouter Get one user route
RequestStatusRouter.get('/:id', (req, res) => {
    GetRequestStatus(req.params.id, result => {
        res.json(result);
    })
})

//RequestStatusRouter Get one user route
RequestStatusRouter.get('/status/:name', (req, res) => {
    GetRequestStatusWithName(req.params.name, result => {
        res.json(result);
    })
})

//RequestStatusRouter create a user route
RequestStatusRouter.post('/', (req, res)=> {
    AddRequestStatus(req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//RequestStatusRouter update a user by id route
RequestStatusRouter.put('/:id', (req, res) => {
    UpdateRequestStatusByStatusId(req.params.id, req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//RequestStatusRouter delete a user by id route
RequestStatusRouter.delete('/:id', (req, res) => {
    DeleteRequestStatusByStatusId(req.params.id, result => {
    if (result && result.success)
        res.status(200).json(result);
    else
        res.status(400).json(result);
    })
})

module.exports = RequestStatusRouter;