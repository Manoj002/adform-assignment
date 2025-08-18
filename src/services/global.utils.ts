import type { Dayjs } from "dayjs";
import type {
  TUser,
  TUserMapAccumulator,
  TUsers,
} from "../global.types/users.types";
import dayjs from "dayjs";

export const isDateRangeValid = (startDate: string, endDate: string) => {
  const start: Date = new Date(startDate);
  const end: Date = new Date(endDate);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return today >= start && today <= end;
};

export const formatUSD = (amount: number, decimals = 2) => {
  const formatter = (num: number, suffix: string) =>
    `${num.toFixed(decimals).replace(/\.0+$/, "")}${suffix} USD`;

  if (amount < 1_000) return `${amount} USD`;
  if (amount < 1_000_000) return formatter(amount / 1_000, "K");
  if (amount < 1_000_000_000) return formatter(amount / 1_000_000, "M");

  return formatter(amount / 1_000_000_000, "B");
};

export const usersMap = (users: TUsers) =>
  users.reduce((accumulator: TUserMapAccumulator, currentValue: TUser) => {
    accumulator[currentValue.id] = currentValue.name;
    return accumulator;
  }, {});

export const dateFormatter = (date: string | Dayjs): string =>
  dayjs(date).format("MM/DD/YYYY");
