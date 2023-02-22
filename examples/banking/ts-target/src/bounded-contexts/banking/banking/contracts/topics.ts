import { DepositMoneyCommand } from '../application/deposit-money';
import { GetAccountQuery } from '../application/get-account-details/GetAccountQuery';
import { GetCustomerByAccountIdQuery } from '../application/get-customer-details-by-account-id/GetCustomerByAccountIdQuery';
import { GetCustomerByIdQuery } from '../application/get-customer-details-by-id/GetCustomerByIdQuery';
import { InsertPINCommand } from '../application/insert-card-pin';
import { SendEmailVerificationCommand } from '../application/send-email-verification';
import { WithdrawMoneyCommand } from '../application/withdraw-money';

const INSERT_PIN_COMMAND_NAME = InsertPINCommand.commandName;
const DEPOSIT_MONEY_COMMAND_NAME = DepositMoneyCommand.commandName;
const WITHDRAW_MONEY_COMMAND_NAME = WithdrawMoneyCommand.commandName;
const SEND_EMAIL_VERIFICATION_COMMAND_NAME = SendEmailVerificationCommand.commandName;

const GET_CUSTOMER_BY_ID_QUERY_NAME = GetCustomerByIdQuery.queryName;
const GET_ACCOUNT_QUERY_NAME = GetAccountQuery.queryName;
const GET_CUSTOMER_BY_ACCOUNT_ID_QUERY_NAME = GetCustomerByAccountIdQuery.queryName;

export {
  INSERT_PIN_COMMAND_NAME,
  DEPOSIT_MONEY_COMMAND_NAME,
  WITHDRAW_MONEY_COMMAND_NAME,
  SEND_EMAIL_VERIFICATION_COMMAND_NAME,
  GET_CUSTOMER_BY_ID_QUERY_NAME,
  GET_ACCOUNT_QUERY_NAME,
  GET_CUSTOMER_BY_ACCOUNT_ID_QUERY_NAME,
};
