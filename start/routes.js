'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.resource('movie', 'MovieController').apiOnly()
Route.resource('director', 'DirectorController').apiOnly()
Route.get('director/:id/movies', 'DirectorController.movies').as('director.movies')
Route.resource('genre', 'GenreController').apiOnly()
Route.get('genre/:id/movies', 'GenreController.movies').as('genre.movies')
