'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundException extends LogicalException {
  constructor(message = 'Data not found'){
    super()
    this.message = message
  }

  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      status : 'NotFound',
      data: null,
      error: this.message
    })
  }
}

module.exports = NotFoundException
