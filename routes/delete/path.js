const auth = require('../../middleware/auth')
const Path = require('../../models/Path')
const PathNotification = require('../../models/Path')
const GoalNotification = require('../../models/Path')

// Deletes path
module.exports = (router) => {
  router.get('/api/delete-path', auth, async (req, res) => {
    await Path.findByIdAndDelete(req.query.id)
    await PathNotification.deleteMany({ path: req.query.id })
    await GoalNotification.deleteMany({ path: req.query.id })
    res.send({ message: 'Successfully deleted!' })
  })
}
