'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class BadRequestException extends LogicalException {
  constructor(message = 'Bad Request'){
    super()
    this.message = message
  }

  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    return response.status(400).json({
      status : 'BadRequest',
      data: null,
      error: this.message
    })
  }
}

module.exports = BadRequestException
