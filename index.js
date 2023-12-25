// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PaymentService = {
  "STRIPE": "STRIPE",
  "PAYPAL": "PAYPAL",
  "RAZORPAY": "RAZORPAY",
  "CASHFREE": "CASHFREE",
  "PAYTM": "PAYTM",
  "PHONEPE": "PHONEPE",
  "UPI": "UPI"
};

const { Customer, CustomerConnection, Order, OrderConnection, User, UserAPIKey, UserAPIKeyConnection, UserConnection } = initSchema(schema);

export {
  PaymentService,
  Customer,
  CustomerConnection,
  Order,
  OrderConnection,
  User,
  UserAPIKey,
  UserAPIKeyConnection,
  UserConnection
};