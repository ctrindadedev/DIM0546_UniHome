const { Router } = require('express')
const router = Router()

router.use('/properties', require('../modules/properties/property.route'))

module.exports = router