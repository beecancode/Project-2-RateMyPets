const Pet = require('../models/pet');


module.exports = {
  index,
  show,
  new: newPet,
  create
};

function index(req, res) {
  Pet.find({}, function (err, pets) {
    res.render('pets/index', { title: 'All pets', pets });
  });
}

function show(req, res) {
  Pet.findById(req.params.id)
    .exec(function (err, pet) {

      res.render('pets/show', { title: `Rate ${pet.name} !`, pet });
    });
    

  //.populate('cast')
  //.exec(function(err, pet) {
  // Native MongoDB syntax
  //});
}

function newPet(req, res) {
  res.render('pets/new', { title: 'Add Pet' });
}

function create(req, res) {
  // ensure empty inputs are removed so that model's default values will work
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const pet = new Pet(req.body);
  pet.save(function (err) {
    if (err) return res.redirect('/pets/new');
    res.redirect(`/pets/${pet._id}`);
  });
}