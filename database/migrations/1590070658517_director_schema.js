'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DirectorSchema extends Schema {
  up () {
    this.create('directors', (table) => {
      table.increments().primary()
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('directors')
  }
}

module.exports = DirectorSchema
