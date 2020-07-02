const express = require('express')
const Joi = require('joi')

const app = express()
app.use(express.json())

const courses = [
  { id: 1, name: 'courseone' },
  { id: 2, name: 'coursetwo' },
  { id: 3, name: 'coursethree' }
]

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/api/courses', (req, res) => {
  res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) res.status(404).send('Course not found of the given id.')
  res.send(course)
})

app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  }
  const result = Joi.validate(req.body, schema)

  if (result.error) {
    res.status(400).send(result.error)
    return
  }

  const object = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(object)
  res.send(object)
})

const port = process.env.PORT || 8000
app.listen(8000, () => {
  console.log(`Server started at port ${port}`)
})
