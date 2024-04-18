export class ResponseObject {
  statusCode: string;
  message: string;
  data: any;

  constructor(statusCode: string, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(data: any) {
    return new ResponseObject('200', 'Success', data);
  }

  static error(message: string) {
    return new ResponseObject('400', message, null);
  }
}
