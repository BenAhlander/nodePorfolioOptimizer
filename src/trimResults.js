export function trimResults(results) {
  const listReturnCount = results.map(({ returns }) => returns.length);
  const min = Math.min(...listReturnCount);
  const _results = results.map((_result) => {
    return { ..._result, returns: _result.returns.slice(0, min) };
  });
  return _results;
}
