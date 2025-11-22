export function matchPrediction(latestBill, predictions) {
  if (!latestBill) return null;

  return predictions.find((pred) => {
    const p = new Date(pred.predictedDate);
    const b = new Date(latestBill.date);
    return p.getMonth() === b.getMonth() && p.getFullYear() === b.getFullYear();
  });
}

export function computeChange(latestBill, predictions) {
  if (!latestBill) return 0;

  const match = matchPrediction(latestBill, predictions);

  const predicted = match?.predictedCost ?? latestBill.cost * 1.1;
  const scanned = latestBill.cost;

  if (!predicted) return 0;

  return (((scanned - predicted) / predicted) * 100).toFixed(2);
}
