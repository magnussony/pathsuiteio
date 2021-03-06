const auth = require('../../middleware/auth')
const Path = require('../../models/Path')
const SubtaskNotification = require('../../models/notifications/SubtaskNotification')
const PathNotification = require('../../models/notifications/PathNotification')

module.exports = (router) => {
  router.post('/api/update-subtask-status', auth, async (req, res) => {
    try {
      // Essential logic updating subtask status
      const path = await Path.findById(req.body.pathId)
        .populate('user', 'firstName lastName')
        .exec()
      // finds the index of the subtask with the id from req.body.pathId and then sets either isCompleted or !
      const subtaskIndex = path.subtasks.findIndex((subtask) => subtask._id == req.body.subtaskId)
      path.subtasks[subtaskIndex].isCompleted = !path.subtasks[subtaskIndex].isCompleted
      path.subtasks.every((subtask) => subtask.isCompleted)
        ? (path.isCompleted = true)
        : (path.isCompleted = false)
      await path.save()

      // subtask NOTIFICATION if the subtask is Completed creates a subtaskNotification else deletes
      if (path.subtasks[subtaskIndex].isCompleted) {
        const subtaskNotification = new SubtaskNotification({
          description: `${path.user.firstName} ${path.user.lastName} completed the subtask "${path.subtasks[subtaskIndex].subtaskTitle}"`,
          user: path.user._id,
          subtask: path.subtasks[subtaskIndex]._id,
          path: path._id,
          company: req.user.company._id,
        })
        await subtaskNotification.save()
      } else {
        await SubtaskNotification.findOneAndDelete({ subtask: path.subtasks[subtaskIndex]._id })
      }

      // PATH NOTIFICATION if the PATH is Completed creates a pathNotification else deletes
      if (path.subtasks.every((subtask) => subtask.isCompleted)) {
        const pathNotification = new PathNotification({
          description: `${path.user.firstName} ${path.user.lastName} completed the path "${path.pathTitle}"`,
          path: path._id,
          user: path.user._id,
          company: req.user.company._id,
        })
        await pathNotification.save()
      } else {
        await PathNotification.findOneAndDelete({ path: path._id })
      }
    } catch (e) {
      res.status(401).send(e)
    }
  })

  // Used to update paths
  router.patch('/api/update-path', auth, async (req, res) => {
    try {
      await Path.findByIdAndUpdate(req.query.id, { ...req.body })
      res.send({ message: 'Successfully updated!' })
    } catch (e) {
      res.status(406).send(e)
    }
  })
}
