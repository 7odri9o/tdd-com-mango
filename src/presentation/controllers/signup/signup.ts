import { AddAccount, Controller, EmailValidator, HttpRequest, HttpResponse } from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmationPassword']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, confirmationPassword } = httpRequest.body

      if (password !== confirmationPassword) {
        return badRequest(new InvalidParamError('confirmationPassword'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })

      class SignUpHttpResponse implements HttpResponse {
        statusCode: number
        body: any
      }

      const signUpHttpResponse = new SignUpHttpResponse()
      return signUpHttpResponse
    } catch (error) {
      return serverError()
    }
  }
}