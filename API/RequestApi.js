const express = require('express');
const { GetRequest, GetRequests, AddRequest, 
    UpdateRequestByRequestId, DeleteRequestByRequestId } = require('../Controllers/RequestController');

let RequestRouter = express.Router(); 

//RequestRouter Get All users route
RequestRouter.get('/', (req, res) => {
    GetRequests(results => {
        res.json(results);
    }); 
})
//RequestRouter Get one user route
RequestRouter.get('/:id', (req, res) => {
    GetRequest(req.params.id, result => {
        res.json(result);
    })
})


//RequestRouter create a user route
RequestRouter.post('/', (req, res)=> {
    AddRequest(req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//RequestRouter update a user by id route
RequestRouter.put('/:id', (req, res) => {
    UpdateRequestByRequestId(req.params.id, req.body, result => {
        if (result && result.success)
            res.status(200).json(result);
        else
            res.status(400).json(result);
    })
})

//RequestRouter delete a user by id route
RequestRouter.delete('/:id', (req, res) => {
    DeleteRequestByRequestId(req.params.id, result => {
    if (result && result.success)
        res.status(200).json(result);
    else
        res.status(400).json(result);
    })
})

module.exports = RequestRouter;