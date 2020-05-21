'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Director extends Model {
  static get hidden () {
    return ['updated_at']
  }

  movies (){
    return this.hasMany('App/Models/Movie', 'id', 'director')
  }
}

module.exports = Director
