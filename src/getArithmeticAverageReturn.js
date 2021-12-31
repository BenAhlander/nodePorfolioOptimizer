export function getArithmeticAverageReturn(returns) {
  const listReturns = returns.map(({ percentReturn }) => percentReturn);
  return listReturns.reduce((a, b) => a + b) / listReturns.length;
}
