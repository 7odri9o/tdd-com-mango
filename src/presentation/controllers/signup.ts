import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'confirmationPassword']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    class SignUpHttpResponse implements HttpResponse {
      statusCode: number
      body: any
    }

    const signUpHttpResponse = new SignUpHttpResponse()
    return signUpHttpResponse
  }
}
