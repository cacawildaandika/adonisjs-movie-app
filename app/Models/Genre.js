'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Genre extends Model {
  static get hidden () {
    return ['updated_at']
  }

  movies (){
    return this.hasMany('App/Models/Movie', 'id', 'genre')
  }
}

module.exports = Genre
