const follow = async(req, res, next) => {
  try {
    req.user.following.push(req.params.id)
    req.user.save()
    res.json({msg:"succes"})
  } catch (error) {
    next(error)
  }
}

module.exports = follow