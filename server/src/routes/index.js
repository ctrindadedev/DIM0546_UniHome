const { Router } = require('express')
const router = Router()

router.get('/ping', (_req, res) => {
    res.status(200).json({ success: true, message: 'pong' })
})

router.use('/properties', require('../modules/properties/property.route'))
router.use('/matches', require('../modules/matches/match.route'))
router.use('/users', require('../modules/users/user.route'))

module.exports = router
