'use strict'

const Movie = use('App/Models/Movie')
const Genre = use('App/Models/Genre')
const Director = use('App/Models/Director')
const { validate } = use('Validator')
const NotFoundException = use('App/Exceptions/NotFoundException')
const InternalServerErrorException = use('App/Exceptions/InternalServerErrorException')

class MovieController {
  async index({ request, response }) {
    const movies = await Movie.query().with('genre').with('director').fetch()
    return response.json({
      status: 'Ok',
      data: movies,
      error: null
    })
  }

  async store({ request, response }) {
    const rules = {
      title: 'required',
      director: 'required',
      summary: 'required',
      year: 'required',
      genre: 'required',
      rating: 'required',
    }
    const validation = await validate(request.all(), rules)
    if (validation.fails()) {
      return response.status(400).json(validation.messages())
    }

    const body = request.post()

    try {
      const director = await Director.findOrFail(body.director)
      const genre = await Genre.findOrFail(body.genre)

      const movie = new Movie()

      movie.title = body.title
      movie.director_id = body.director
      movie.genre_id = body.genre
      movie.summary = body.summary
      movie.release_year = body.year
      movie.rating = body.rating

      movie.save()

      return response.json({
        status: 'Created',
        data: movie,
        error: null
      })

    } catch (error) {
      console.log(error);

      if (error.name == "ModelNotFoundException") {
        throw new NotFoundException('Genre / Director not found')
      }
      throw new InternalServerErrorException()
    }
  }

  async show ({ request, response }) {
    try {
      const movie = await Movie.findOrFail(request.params.id)
      const director = await movie.director().fetch()
      const genre = await movie.genre().fetch()
      movie.director = director
      movie.genre = genre
      return response.json({
        status: 'Ok',
        data: movie,
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
    const body = request.post()

    if ( Object.keys(body).length  < 1) {
      return response.status(400).json({
        status: 'Bad Request',
        data: null,
        error: 'Data must 1 or more'
      })
    }

    try {
      const movie = await Movie.findOrFail(request.params.id)

      body.title ? movie.title = body.title : null
      body.summary ? movie.summary = body.summary : null
      body.year ? movie.release_year = body.year : null
      body.rating ? movie.rating = body.rating : null

      if (body.genre) {
        const genre = await Genre.findOrFail(body.genre)
        movie.genre_id = body.genre
      }

      if (body.director) {
        const director = await Director.findOrFail(body.director)
        movie.director_id = body.director
      }

      movie.save()

      return response.json({
        status: 'Ok',
        data: movie,
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
      const movie = await Movie.findOrFail(request.params.id)

      movie.delete()
      return response.status(204).json({
        status: 'Deleted',
        data: null,
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

module.exports = MovieController
