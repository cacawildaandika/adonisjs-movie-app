'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Movie extends Model {
  static get hidden () {
    return ['director_id', 'genre_id']
  }
  director (){
    return this.belongsTo('App/Models/Director')
  }
  genre (){
    return this.belongsTo('App/Models/Genre')
  }
}

module.exports = Movie
