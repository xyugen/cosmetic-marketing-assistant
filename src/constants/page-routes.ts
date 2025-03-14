export enum PageRoutes {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
  DASHBOARD = "/dashboard",
  TRANSACTIONS = "/transactions",
  TRANSACTION_CREATE = `${TRANSACTIONS}/create`,

  // PRODUCT
  PRODUCT_OVERVIEW = "/products",
  PRODUCT_LIST = `${PRODUCT_OVERVIEW}/list`,

  // CUSTOMER
  CUSTOMER_OVERVIEW = "/customers",
  CUSTOMER_LIST = `${CUSTOMER_OVERVIEW}/list`,
  AI_MARKETING = "/ai-marketing",
  AI_ASSISTANT = "/ai-assistant",
  ANALYTICS = "/analytics",
  // ACCOUNT = "/account",
  SETTINGS = "/settings",

  // ADMIN
  MANAGE_ACCOUNTS = "/manage-accounts",
  // AUTHORIZED_EMAILS = "/authorized-emails",
}