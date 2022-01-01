import axios from "axios";
import { getArithmeticAverageReturn } from "./getArithmeticAverageReturn";

function delay(t, v) {
  return new Promise(function (resolve) {
    setTimeout(resolve.bind(null, v), t);
  });
}

export function getMaximumSharpeRatioPortfolio(
  assetReturns,
  assetsCovarianceMatrix,
  riskFreeRate,
  listTickers
) {
  const arithmeticReturns = assetReturns.map(({ returns }, i) => {
    return getArithmeticAverageReturn(returns, listTickers[i]);
  });
  const body = {
    assets: assetReturns.length,
    assetsReturns: arithmeticReturns,
    assetsCovarianceMatrix: assetsCovarianceMatrix.map(({ matrix }) => matrix),
    riskFreeRate: riskFreeRate,
  };
  return delay(1000).then(() => {
    return axios
      .post(
        "https://api.portfoliooptimizer.io/v1/portfolio/optimization/maximum-sharpe-ratio",
        body
      )
      .then(({ data }) => {
        return data.assetsWeights.map((weight, i) => ({
          ticker: listTickers[i],
          weight,
        }));
      })
      .catch((err) => console.error(err));
  });
}
