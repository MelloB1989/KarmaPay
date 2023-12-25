import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum PaymentService {
  STRIPE = "STRIPE",
  PAYPAL = "PAYPAL",
  RAZORPAY = "RAZORPAY",
  CASHFREE = "CASHFREE",
  PAYTM = "PAYTM",
  PHONEPE = "PHONEPE",
  UPI = "UPI"
}

type EagerCustomer = {
  readonly cid: string;
  readonly c_email?: string | null;
  readonly c_ip?: string | null;
  readonly c_location?: string | null;
  readonly c_name?: string | null;
  readonly c_phone?: string | null;
}

type LazyCustomer = {
  readonly cid: string;
  readonly c_email?: string | null;
  readonly c_ip?: string | null;
  readonly c_location?: string | null;
  readonly c_name?: string | null;
  readonly c_phone?: string | null;
}

export declare type Customer = LazyLoading extends LazyLoadingDisabled ? EagerCustomer : LazyCustomer

export declare const Customer: (new (init: ModelInit<Customer>) => Customer)

type EagerCustomerConnection = {
  readonly items?: (Customer | null)[] | null;
  readonly nextToken?: string | null;
}

type LazyCustomerConnection = {
  readonly items?: (Customer | null)[] | null;
  readonly nextToken?: string | null;
}

export declare type CustomerConnection = LazyLoading extends LazyLoadingDisabled ? EagerCustomerConnection : LazyCustomerConnection

export declare const CustomerConnection: (new (init: ModelInit<CustomerConnection>) => CustomerConnection)

type EagerOrder = {
  readonly orderAmt: number;
  readonly orderCid: string;
  readonly orderCurrency: string;
  readonly orderDescription?: string | null;
  readonly orderID: string;
  readonly orderStatus: string;
  readonly orderTimestamp?: string | null;
  readonly orderUpiTrnx?: string | null;
}

type LazyOrder = {
  readonly orderAmt: number;
  readonly orderCid: string;
  readonly orderCurrency: string;
  readonly orderDescription?: string | null;
  readonly orderID: string;
  readonly orderStatus: string;
  readonly orderTimestamp?: string | null;
  readonly orderUpiTrnx?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order)

type EagerOrderConnection = {
  readonly items?: (Order | null)[] | null;
  readonly nextToken?: string | null;
}

type LazyOrderConnection = {
  readonly items?: (Order | null)[] | null;
  readonly nextToken?: string | null;
}

export declare type OrderConnection = LazyLoading extends LazyLoadingDisabled ? EagerOrderConnection : LazyOrderConnection

export declare const OrderConnection: (new (init: ModelInit<OrderConnection>) => OrderConnection)

type EagerUser = {
  readonly email: string;
  readonly api_keys: (string | null)[];
  readonly business_name?: string | null;
  readonly business_url?: string | null;
  readonly customers: (string | null)[];
  readonly orders: (string | null)[];
  readonly pfp?: string | null;
  readonly subdomain?: string | null;
  readonly subdomain_status?: string | null;
}

type LazyUser = {
  readonly email: string;
  readonly api_keys: (string | null)[];
  readonly business_name?: string | null;
  readonly business_url?: string | null;
  readonly customers: (string | null)[];
  readonly orders: (string | null)[];
  readonly pfp?: string | null;
  readonly subdomain?: string | null;
  readonly subdomain_status?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User)

type EagerUserAPIKey = {
  readonly id: string;
  readonly apiKey: string;
  readonly pgEnum: string;
}

type LazyUserAPIKey = {
  readonly id: string;
  readonly apiKey: string;
  readonly pgEnum: string;
}

export declare type UserAPIKey = LazyLoading extends LazyLoadingDisabled ? EagerUserAPIKey : LazyUserAPIKey

export declare const UserAPIKey: (new (init: ModelInit<UserAPIKey>) => UserAPIKey)

type EagerUserAPIKeyConnection = {
  readonly items?: (UserAPIKey | null)[] | null;
  readonly nextToken?: string | null;
}

type LazyUserAPIKeyConnection = {
  readonly items?: (UserAPIKey | null)[] | null;
  readonly nextToken?: string | null;
}

export declare type UserAPIKeyConnection = LazyLoading extends LazyLoadingDisabled ? EagerUserAPIKeyConnection : LazyUserAPIKeyConnection

export declare const UserAPIKeyConnection: (new (init: ModelInit<UserAPIKeyConnection>) => UserAPIKeyConnection)

type EagerUserConnection = {
  readonly items?: (User | null)[] | null;
  readonly nextToken?: string | null;
}

type LazyUserConnection = {
  readonly items?: (User | null)[] | null;
  readonly nextToken?: string | null;
}

export declare type UserConnection = LazyLoading extends LazyLoadingDisabled ? EagerUserConnection : LazyUserConnection

export declare const UserConnection: (new (init: ModelInit<UserConnection>) => UserConnection)

