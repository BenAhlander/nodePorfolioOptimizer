import axios from "axios";

export function getAssetsCovarianceMatrix(assetsReturns) {
  const body = {
    assets: assetsReturns.map(({ returns }) => {
      return {
        assetReturns: returns.map(({ percentReturn }) => percentReturn),
      };
    }),
  };
  return axios
    .post("https://api.portfoliooptimizer.io/v1/assets/covariance/matrix", body)
    .then(({ data }) => {
      return data.assetsCovarianceMatrix.map((matrix, i) => {
        return { ticker: assetsReturns[i].ticker, matrix };
      });
    })
    .catch((err) => console.error(err));
}
