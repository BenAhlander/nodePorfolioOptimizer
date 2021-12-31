import { getListMonthlyReturns } from "./getListMonthlyReturns";
import { getAssetsCovarianceMatrix } from "./getAssetsCovarianceMatrix";
import { getMaximumSharpeRatioPortfolio } from "./getMaximumSharpeRatioPortfolio";
import dotenv from "dotenv";
dotenv.config();

const riskFreeRate = 0.0127;
const listTickers = ["SPY", "QQQ", "AAPL"];

getListMonthlyReturns(listTickers).then((returns) => {
  return getAssetsCovarianceMatrix(returns).then((covarianceMatrices) => {
    console.log(covarianceMatrices);
    getMaximumSharpeRatioPortfolio(
      returns,
      covarianceMatrices,
      riskFreeRate,
      listTickers
    ).then((optimalWeights) => console.log(optimalWeights));
  });
});
