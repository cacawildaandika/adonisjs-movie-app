'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Movie extends Model {
  director (){
    return this.hasOne('App/Models/Director', 'id', 'director')
  }
  genre (){
    return this.hasOne('App/Models/Genre', 'id', 'genre')
  }
}

module.exports = Movie
