'use strict'

const Genre = use('App/Models/Genre')
const { validate } = use('Validator')
const NotFoundException = use('App/Exceptions/NotFoundException')
const BadRequestException = use('App/Exceptions/BadRequestException')
const InternalServerErrorException = use('App/Exceptions/InternalServerErrorException')

class GenreController {
  async index ({request, response}) {
    const genres = await Genre.all()
    return response.json({
      status: 'Ok',
      data: genres,
      error: null
    })
  }

  async store ({ request, response }) {
    const rules = {
      name: 'required|unique:genres'
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new BadRequestException(validation.messages())
    }

    const body = request.post()

    try {
      const genre = new Genre()
      genre.name = body.name
      await genre.save()

      return response.json({
        status: 'Created',
        data: genre,
        error: null
      })
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  async show ({ request, response }) {
    try {
      const genre = await Genre.findOrFail(request.params.id)
      return response.json({
        status: 'Ok',
        data: genre,
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
      name: 'required|unique:genres'
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      throw new BadRequestException(validation.messages())
    }

    const body = request.post()

    try {
      const genre = await Genre.findOrFail(request.params.id)
      genre.name = body.name
      genre.save()
      return response.json({
        status: 'Ok',
        data: genre,
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
      const genre = await Genre.findOrFail(request.params.id)
      const moviesCount = [].length

      if (moviesCount > 0) {
        throw new BadRequestException('In Relationship. Can\'t delete a genre who is still in a relationship')
      }else{
        genre.delete()
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
      const genre = await Genre.findOrFail(request.params.id)
      const movies = await genre.movies().fetch()
      return response.json({
        status: 'Ok',
        data: {
          genre,
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

module.exports = GenreController
