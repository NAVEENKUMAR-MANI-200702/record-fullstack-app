class APIResponse {
  static OK = 200;
  static ERROR = 500;
  static BAD_REQUEST = 400;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;

  constructor(status, message, response = null) {
    this.status = status;
    this.message = message;
    this.response = response;
  }

  static success(data = null) {
    return new APIResponse(this.OK, "success", data);
  }

  static failure(status, message, data = null) {
    return new APIResponse(status, message, data);
  }
}

export default APIResponse;