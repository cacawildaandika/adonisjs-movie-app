'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RenameDirectorFieldInMovieSchema extends Schema {
  up () {
    this.alter('movies', (table) => {
      table.renameColumn('director', 'director_id')
    })
  }

  down () {
    this.alter('movies', (table) => {
      table.renameColumn('director_id', 'director')
    })
  }
}

module.exports = RenameDirectorFieldInMovieSchema
