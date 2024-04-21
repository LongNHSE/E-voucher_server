export class ResponseObject {
  statusCode: number;
  message: string;
  data: any;

  constructor(statusCode: number, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(data: any) {
    return new ResponseObject(200, 'Success', data);
  }

  static badReqError(message: string) {
    return new ResponseObject(400, message, null);
  }
}
