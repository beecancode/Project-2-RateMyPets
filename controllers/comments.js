const Pet = require('../models/pet');


module.exports = {
  create,
  delete: deleteComment,
  update: updateComment
};

async function deleteComment(req, res) {
  const pet = await Pet.findOne({'comments._id': req.params.id});
  // Want to ensure that the comment was
  // created by the currently logged in user
  // before we remove it
  const comment = pet.comments.id(req.params.id);
  if (!comment.userId.equals(req.user._id)) return res.redirect(`/pets/${pet._id}`);
  comment.remove();
  // Save the updated pet
  await pet.save();
  res.redirect(`/pets/${pet._id}`);
}

function create(req, res) {
  // Find the pet to embed the comment within
  Pet.findById(req.params.id, function(err, pet) {
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    // Push the subdoc for the comment
    pet.comments.push(req.body);
    console.log(pet);
    // Always save the top-level document (not subdocs)
    pet.save(function(err) {
      res.redirect(`/pets/${pet._id}`);
    });
  });
}

function updateComment(req, res) {
  
   Pet.findOne({'comments._id': req.params.id}, function(err, pet) {
     const commentSubdoc = pet.comments.id(req.params.id);
     if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/pets/${pet._id}`);
     commentSubdoc.content = req.body.content;
    pet.save(function(err) {
       res.redirect(`/pets/${pet._id}`);
     });
   });
}