const { Router } = require('express')
const router = Router()

router.get('/ping', (_req, res) => {
    res.status(200).json({ success: true, message: 'pong' })
})

router.use('/properties', require('../modules/properties/property.route'))

module.exports = router