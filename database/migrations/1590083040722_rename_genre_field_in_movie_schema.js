'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RenameGenreFieldInMovieSchema extends Schema {
  up () {
    this.alter('movies', (table) => {
      table.renameColumn('genre', 'genre_id')
    })
  }

  down () {
    this.alter('movies', (table) => {
      table.renameColumn('genre_id', 'genre')
    })
  }
}

module.exports = RenameGenreFieldInMovieSchema
