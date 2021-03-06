const Pet = require('../models/pet');


module.exports = {
  create,
  delete: deleteComment,
  update: updateComment,
  edit: editComment
  
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
    
    // Always save the top-level document (not subdocs)
    pet.save(function(err) {
      res.redirect(`/pets/${pet._id}`);
    });
  });
}

function updateComment(req, res) {
  console.log(req.body, "<--- updateComment");
   Pet.findOne({'comments._id': req.params.id}, function(err, pet) {
     const commentSubdoc = pet.comments.id(req.params.id);
     if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/pets/${pet._id}`);
     commentSubdoc.content = req.body.content;
     commentSubdoc.rating = req.body.rating;
    pet.save(function(err) {
       res.redirect(`/pets/${pet._id}`);
     });
   });
}

function editComment(req, res) {
  console.log(req.params.id, "<-- is something");
  Pet.findOne({'comments._id': req.params.id}, function(err, pet) {
    console.log(err,pet, "error")
    const comment = pet.comments.id(req.params.id)
    res.render("pets/edit", {comment, pet})
  })
};
