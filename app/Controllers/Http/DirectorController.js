'use strict'

const Director = use('App/Models/Director')
const Movie = use('App/Models/Movie')
const { validate } = use('Validator')
const NotFoundException = use('App/Exceptions/NotFoundException')
const InternalServerErrorException = use('App/Exceptions/InternalServerErrorException')

class DirectorController {
  async index ({request, response}) {
    const directors = await Director.all()
    return response.json({
      status: 'Ok',
      data: directors,
      error: null
    })
  }

  async store ({ request, response }) {
    const rules = {
      name: 'required|unique:directors'
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return response.status(400).json(validation.messages())
    }

    const body = request.post()

    try {
      const director = new Director()
      director.name = body.name
      await director.save()

      return response.json({
        status: 'Created',
        data: director,
        error: null
      })
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async show ({ request, response }) {
    try {
      const director = await Director.findOrFail(request.params.id)
      return response.json({
        status: 'Ok',
        data: director,
        error: null
      })
    } catch (error) {
      if (error.name == "ModelNotFoundException") {
        throw new NotFoundException()
      }
      throw new InternalServerErrorException()
    }
  }

  async update ({ request, response }) {
    const rules = {
      name: 'required|unique:directors'
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return response.status(400).json(validation.messages())
    }

    const body = request.post()

    try {
      const director = await Director.findOrFail(request.params.id)
      director.name = body.name
      director.save()
      return response.json({
        status: 'Ok',
        data: director,
        error: null
      })
    } catch (error) {
      if (error.name == "ModelNotFoundException") {
        throw new NotFoundException()
      }
      throw new InternalServerErrorException()
    }
  }

  async destroy({ request, response }) {
    try {
      const director = await Director.findOrFail(request.params.id)
      const moviesCount = [].length

      if (moviesCount > 0) {
        return response.status(400).json({
          status: 'InRelationship',
          data: null,
          error: 'In Relationship. Can\'t delete a director who is still in a relationship'
        })
      }else{
        director.delete()
        return response.status(204).json({
          status: 'Deleted',
          data: null,
          error: null
        })
      }
    } catch (error) {
      if (error.name == "ModelNotFoundException") {
        throw new NotFoundException()
      }
      throw new InternalServerErrorException()
    }
  }

  async movies({ request, response }) {
    try {
      const director = await Director.findOrFail(request.params.id)
      const movies = await director.movies().fetch()
      return response.json({
        status: 'Ok',
        data: {
          director,
          movies
        },
        error: null
      })
    } catch (error) {
      if (error.name == "ModelNotFoundException") {
        throw new NotFoundException()
      }
      throw new InternalServerErrorException()
    }
  }
}

module.exports = DirectorController
