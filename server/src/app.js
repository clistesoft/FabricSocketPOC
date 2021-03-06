const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const users = [];
const objectModifying = { }

const getUserById = function (id) {
    return users.find(item => item.id === id);
    // for (const i = 0; i < users.length; i++) {
    //     if (users[i].id === id)
    //         return users[i];
    // }
    // return undefined;

};

const getUserIndexById = function(id) {
    
    return users.findIndex(item => item.id === id);

    // for (const i = 0; i < users.length; i++) {
    //     if (users[i].id === id)
    //         return i;
    // }
    // return -1;
};

io.on('connection', socket => {
    var user = getUserById(socket.id);
    // var objectModifying = getModifyingObj();

    if (typeof user === 'undefined')
    users.push({id: socket.id, name: ''});

    io.sockets.emit('users', users);

    socket.on('disconnect', function() {
        var index = getUserIndexById(socket.id);
        // console.log(`Socket ${socket.id} disconnect`, index);
        if (index > -1)
            users.splice(index, 1);
        
        socket.emit('users', users);

    });
    socket.on('object:modifying', function (value) {
            // console.log('object:modifying',this.user)
        //send object:modifying to everyone except the sender
        socket.emit('object:modifying', value);
        io.sockets.emit('objectModifying', value);
    });
    
    socket.on('object:stoppedModifying', function (value) {

        //send object:stoppedModifying to everyone except the sender
        socket.emit('object:stoppedModifying', value);
        // io.sockets.emit('objectModifying', objectModifying);
        io.sockets.emit('objectModifying', value);
    });

    socket.on('addRectangle', function (value) {

        //send object:stoppedModifying to everyone except the sender
        socket.emit('addRectangle', value);

    });

    socket.on('setUser', function (value) {
        var user = getUserById(socket.id);
        if (typeof user !== 'undefined'){
            user.name = value.name;
            user.color = value.color;
        }
            
        
        io.sockets.emit('users', users);
    });

    // console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});
