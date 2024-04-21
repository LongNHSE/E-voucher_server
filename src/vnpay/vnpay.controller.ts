import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';
import * as querystring from 'qs';
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
    // const returnUrl = 'exp://192.168.1.60:8081/--/voucher';
    const returnUrl = body.redirectUri;

    const amount = body.total;
    const bankCode = body.bankCode || '';
    const voucherId = body.voucherId;

    let locale = 'vn';
    if (!locale) {
      locale = 'vn';
    }

    const currCode = 'VND';
    let vnp_Params: any = {};

    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = `${createDate}-${voucherId}`;
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
      encode: false,
    });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(signData).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl +=
      '?' +
      querystring.stringify(vnp_Params, {
        encode: false,
      });

    // const signData = querystring.stringify(vnp_Params, { encode: false });
    // vnpParams.vnp_SecureHash = signed;
    // vnpUrl += `?${querystring.stringify(vnpParams)}`;

    return vnpUrl;
  }

  // @Post('get-payment')
  // async getPaymentStatus(@Req() req: Request, @Body() body): Promise<string> {
  //   const { id } = req.params;

  //   let vnp_Params = req.query;

  //   const secureHash = vnp_Params['vnp_SecureHash'];

  //   delete vnp_Params['vnp_SecureHash'];
  //   delete vnp_Params['vnp_SecureHashType'];

  //   vnp_Params = this.sortObject(vnp_Params);

  //   const tmnCode = process.env.VNP_TMNCODE;
  //   const secretKey = process.env.VNP_HASHSECRET;

  //   const signData = querystring.stringify(vnp_Params, { encode: false });
  //   const hmac = crypto.createHmac('sha512', secretKey);
  //   const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

  //   //   console.log("Request query:", signData);
  //   console.log('Generated signature:', signed);
  //   console.log('Received signature:', secureHash);

  //   if (secureHash === signed) {
  //     // Signature matched, proceed with processing the payment

  //     if (req.query.vnp_TransactionStatus == '00') {
  //     } else {
  //     }
  //   } else {
  //   }
  //   // Signature mismatch, indicating potential tampering
  // }

  // Function to sort the object keys
  //   sortObject(obj: any) {
  //     const sortedKeys = Object.keys(obj).sort();
  //     const sortedObj: any = {};
  //     sortedKeys.forEach((key) => {
  //       sortedObj[key] = obj[key];
  //     });
  //     return sortedObj;
  //   }

  sortObject(obj) {
    const sorted = {};
    const str = [];
    let key = '';
    // eslint-disable-next-line no-restricted-syntax
    for (key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    let key2 = 0;
    // eslint-disable-next-line no-plusplus
    for (key2 = 0; key2 < str.length; key2++) {
      sorted[str[key2]] = encodeURIComponent(obj[str[key2]]).replace(
        /%20/g,
        '+',
      );
    }
    return sorted;
  }
}
