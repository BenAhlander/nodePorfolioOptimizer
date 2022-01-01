import { getMonthlyReturns } from "./getMonthlyReturns";
export function getListMonthlyReturns(listTickers) {
  return Promise.all(
    listTickers.map((ticker) =>
      getMonthlyReturns(ticker).then((listReturns) => {
        return { ticker, returns: listReturns };
      })
    )
  );
}
