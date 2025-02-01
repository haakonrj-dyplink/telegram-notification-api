/**
 * @class HttpError
 * @extends {Error}
 */
class HttpError extends Error {
  /**
   * Creates an instance of HttpError.
   * @param {number} status
   * @param {string} message
   * @memberof HttpError
   */
  declare status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError ' + status;
    this.status = status;
  }
}

export default HttpError;
