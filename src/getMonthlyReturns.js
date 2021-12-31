import axios from "axios";

export function getMonthlyReturns(ticker) {
  return axios
    .get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${ticker}&apikey=${process.env.ALPAVANTAGE_KEY}`
    )
    .then(({ data }) => {
      if (data) {
        return Object.entries(data["Monthly Time Series"]).map(
          ([key, value]) => {
            const open = value["1. open"];
            const close = value["4. close"];
            return {
              date: key,
              nominalReturn: close - open,
              percentReturn: (close - open) / open,
            };
          }
        );
      } else {
        console.error("missing data", data);
      }
    })
    .catch((err) => console.error(err));
}
