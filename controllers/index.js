const Pet = require('../models/user');

module.exports = {
    index
};

// function addFact(req, res){
//     req.user.facts.push(req.body);

//     req.user.save(function(err){
//         res.redirect('/bloggers')
//     })
// }


function index(req, res, next) {
    console.log(req.query)
    console.log(req.user)

    let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};

    let sortKey = req.query.sort || 'name';
    Pet.find(modelQuery)
    .sort(sortKey).exec(function(err, pets) {
        if (err) return next(err);

        res.render('pets/index', {
            pets,
            user: req.user,
            name: req.query.name,
            sortKey
        });
    });
}