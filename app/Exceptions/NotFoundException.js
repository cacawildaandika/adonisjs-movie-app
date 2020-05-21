'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(404).json({
      status : 'NotFound',
      data: null,
      error: 'Data not found'
    })
  }
}

module.exports = NotFoundException
