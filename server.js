const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const UsersRouter = require('./API/UserApi')
const RolesRouter = require('./API/RoleApi.js');
const UserRoleRouter = require('./API/UserRoleApi.js');
const RequestTypeRouter = require('./API/RequestTypeApi.js');
const RequestStatusRouter = require('./API/RequestStatusApi.js');
const RequestRouter = require('./API/RequestApi.js');

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.use('/api/users', UsersRouter);
app.use('/api/roles', RolesRouter);
app.use('/api/user-role', UserRoleRouter);
app.use('/api/request-type', RequestTypeRouter);
app.use('/api/request-status', RequestStatusRouter);
app.use('/api/request', RequestRouter);


app.listen(4000, () => {
    console.log('listening on port 4000');
})
