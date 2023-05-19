const { addUser, getUsers, getUser, getUserByUsername, updateUser, deleteUser } = require('../services/firebase/UserService');
const { addAdmin, getAdmin, getAdmins, updateAdmin, deleteAdmin } = require('../services/firebase/AdminService');
const { getModelInfo } = require('../services/firebase/ModelService');

module.exports = (app) => {

    // UserS
    app.route('/users/Users')
    .get(getUsers)
    .post(addUser);

    app.route('/users/:id').get(getUserByUsername);

    app.route('/users/Users/:id').get(getUser);

    app.route('/users/Users/:id/model').get(getModelInfo);

    app.route('/users/Users/:id').put(updateUser);

    app.route('/users/Users/:id').delete(deleteUser);

    // AdminS
    app.route('/users/Admins')
    .get(getAdmins)
    .post(addAdmin);

    app.route('/users/Admins/:id').get(getAdmin);

    app.route('/users/Admins/:id').put(updateAdmin);

    app.route('/users/Admins/:id').delete(deleteAdmin);

    app.get('/users', (req, res, next)=>{
        console.log("Users Here");
    })

    app.route('/logout').get((req, res, next)=>{
        req.session.destroy();
        res.redirect("/");
    });

    

    
}