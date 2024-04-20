import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';
import * as querystring from 'querystring';
import * as moment from 'moment';

@Controller('vnpay')
export class VnpayController {
  constructor() {}

  @Post('create-payment')
  async createPaymentRequest(
    @Req() req: Request,
    @Body() body,
  ): Promise<string> {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');
    const ipAddr = req.headers['x-forwarded-for'] || req.ip;

    const tmnCode = process.env.VNP_TMNCODE;
    const secretKey = process.env.VNP_HASHSECRET;
    let vnpUrl = process.env.VNP_URL;
    const returnUrl = `http://localhost:3000`;

    const amount = body.total;
    const bankCode = body.bankCode || '';
    const voucherId = body.voucherId;

    console.log(voucherId);

    let locale = 'vn';
    if (!locale) {
      locale = 'vn';
    }

    const currCode = 'VND';
    let vnp_Params = {};

    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = '12345';
    vnp_Params['vnp_OrderInfo'] = `Pay for voucher: ${voucherId}`;
    vnp_Params['vnp_OrderType'] = 'VNPay';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = this.sortObject(vnp_Params);

    const signData = querystring.stringify(vnp_Params, {
      endcode: false,
    } as any);
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl +=
      '?' +
      querystring.stringify(vnp_Params, {
        endcode: false,
      } as any);

    // const signData = querystring.stringify(vnp_Params, { encode: false });
    // vnpParams.vnp_SecureHash = signed;
    // vnpUrl += `?${querystring.stringify(vnpParams)}`;

    return vnpUrl;
  }

  // Function to sort the object keys
  sortObject(obj: any) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObj: any = {};
    sortedKeys.forEach((key) => {
      sortedObj[key] = obj[key];
    });
    return sortedObj;
  }
}
