
const router = require('express').Router()
const Results = require('../models/results')

router.get('/', async (request, response) => {
    const results = await Results
      .find({})

    response.json(results)
  })

router.post('/', async (request, response) => {
  const resultInput = new Results(request.body)

  const savedResults = await resultInput.save()

  response.status(201).json(savedResults)
})

module.exports = router