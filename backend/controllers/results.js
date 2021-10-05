
const router = require('express').Router()
const Results = require('../models/results')

router.get('/', async (request, response) => {
    const results = await Results
      .find({}).populate('result', { date: 1, winner: 1 })
    response.json(results)
  })

router.post('/api/results/', async (request, response) => {
  const resultInput = new Result(request.body)

  const savedResults = await resultInput.save()

  response.status(201).json(resultInput)
})

module.exports = router