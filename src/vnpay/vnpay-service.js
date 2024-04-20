import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';
import * as querystring from 'qs';
import * as moment from 'moment';
dotenv.config({ path: './config.env' });

function sortObject(obj) {
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
  // eslint-disable-next-line no-plusplus
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}

exports.createPaymentUrl = async (req, res) => {
  process.env.TZ = 'Asia/Ho_Chi_Minh';
  const date = new Date();
  const createDate = moment(date).format('YYYYMMDDHHmmss');
  const ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  const tmnCode = process.env.VNP_TMNCODE;
  const secretKey = process.env.VNP_HASHSECRET;
  let vnpUrl = process.env.VNP_URL;
  const returnUrl = `${frontendURL}/purchase`;
  const { bookingId } = req.params;
  const booking = await bookingService.getBookingById(bookingId);
  let invoiceTotal = 0;
  if (booking.invoices) {
    console.log(booking.invoices, 'booking.invoices');
    invoiceTotal = booking.invoices.reduce(
      (acc, cur) => acc + cur.totalPrice,
      0,
    );
  }
  console.log(invoiceTotal, 'invoiceTotal');
  const amount = booking.price + invoiceTotal;
  const { bankCode } = req.body;
  let locale = 'vn';
  if (locale === null || locale === '') {
    locale = 'vn';
  }
  const currCode = 'VND';
  let vnpParams = {};
  vnpParams.vnp_Version = '2.1.0';
  vnpParams.vnp_Command = 'pay';
  vnpParams.vnp_TmnCode = tmnCode;
  vnpParams.vnp_Locale = locale;
  vnpParams.vnp_CurrCode = currCode;
  vnpParams.vnp_TxnRef = bookingId;
  vnpParams.vnp_OrderInfo = `Thanh toan cho ma GD:${bookingId}`;
  vnpParams.vnp_OrderType = 'other';
  vnpParams.vnp_Amount = amount * 100;
  vnpParams.vnp_ReturnUrl = returnUrl;
  vnpParams.vnp_IpAddr = ipAddr;
  vnpParams.vnp_CreateDate = createDate;
  if (bankCode !== null && bankCode !== '') {
    vnpParams.vnp_BankCode = bankCode;
  }
  vnpParams = sortObject(vnpParams);
  //   console.log(vnpParams);
  const signData = querystring.stringify(vnpParams, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  vnpParams.vnp_SecureHash = signed;
  vnpUrl += `?${querystring.stringify(vnpParams, { encode: false })}`;
  res
    .status(200)
    .send(ApiResponse.success('Get payment url successfully', vnpUrl));
};
