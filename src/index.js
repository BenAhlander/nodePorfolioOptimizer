import { getListMonthlyReturns } from "./getListMonthlyReturns";
import { getAssetsCovarianceMatrix } from "./getAssetsCovarianceMatrix";
import { getMaximumSharpeRatioPortfolio } from "./getMaximumSharpeRatioPortfolio";
import { trimResults } from "./trimResults";
import dotenv from "dotenv";
dotenv.config();

const riskFreeRate = 0.0005;
const listTickers = ["NFLX", "COST", "BLL", "KO", "MMM", "F", "IVZ", "HBAN"];

getListMonthlyReturns(listTickers).then((returns) => {
  return getAssetsCovarianceMatrix(trimResults(returns)).then(
    (covarianceMatrices) => {
      getMaximumSharpeRatioPortfolio(
        returns,
        covarianceMatrices,
        riskFreeRate,
        listTickers
      ).then((optimalWeights) => console.log(optimalWeights));
    }
  );
});
