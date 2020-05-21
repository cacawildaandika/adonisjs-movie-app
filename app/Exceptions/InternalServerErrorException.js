'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InternalServerErrorException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(500).json({
      status : 'InternalServerError',
      data: null,
      error: 'Internal Server Error'
    })
  }
}

module.exports = InternalServerErrorException
