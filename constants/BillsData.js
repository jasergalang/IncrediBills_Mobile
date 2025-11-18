export const utilities = [
  {
    id: "water",
    name: "Water",
    icon: "💧",
    color: "blue",
    backgroundColor: "#dbeafe",
    borderColor: "#3b82f6",
    amount: 450,
    change: -15,
    provider: "Manila Water",
  },
  {
    id: "electricity",
    name: "Electricity",
    icon: "⚡",
    color: "amber",
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
    amount: 2850,
    change: -8,
    provider: "Meralco",
  },
  {
    id: "gas",
    name: "Kitchen Gas",
    icon: "🔥",
    color: "orange",
    backgroundColor: "#fed7aa",
    borderColor: "#f97316",
    amount: 550,
    change: 5,
    provider: "Petron",
  },
  {
    id: "fuel",
    name: "Transport Fuel",
    icon: "⛽",
    color: "red",
    backgroundColor: "#f3f4f6",
    borderColor: "#6b7280",
    amount: 1200,
    change: 3,
    provider: "Shell",
  },
  {
    id: "grocery",
    name: "Groceries",
    icon: "🛒",
    color: "green",
    backgroundColor: "#bbf7d0",
    borderColor: "#22c55e",
    amount: 3500,
    change: -12,
    provider: "SM Supermarket",
  },
];

export const computeMonthlyTotals = (electricBills, waterBills) => {
  const getLatestMonthTotal = (bills) => {
    if (!bills || bills.length === 0) return 0;

    const monthGroups = bills.reduce((acc, bill) => {
      const date = new Date(bill.date);
      const ym = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!acc[ym]) acc[ym] = [];
      acc[ym].push(bill);
      return acc;
    }, {});

    const latestMonth = Object.keys(monthGroups).sort().reverse()[0];
    const latestBills = monthGroups[latestMonth];

    return latestBills.reduce((sum, b) => sum + (b.cost || 0), 0);
  };

  return {
    water: getLatestMonthTotal(waterBills),
    electricity: getLatestMonthTotal(electricBills),
    gas: 0,
    fuel: 0,
    grocery: 0,
  };
};

export const transformBills = (electricData, waterData) => {
  const formatDate = (date) => {
    if (!date) return "Unknown Date";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formattedElectric = electricData.bills.map((b) => ({
    id: b._id,
    type: "electricity",
    name: "Electricity",
    icon: "⚡",
    provider: "Meralco",
    amount: b.cost || 0,
    dueDate: formatDate(b.date),
    status: b.status,
    color: "amber",
    createdAt: b.createdAt,
  }));

  const formattedWater = waterData.bills.map((b) => ({
    id: b._id,
    type: "water",
    name: "Water",
    icon: "💧",
    provider: "Manila Water",
    amount: b.cost || 0,
    dueDate: formatDate(b.date),
    status: b.status,
    color: "blue",
    createdAt: b.createdAt,
  }));

  return [...formattedElectric, ...formattedWater].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};

export const mergeMonthlyAnalytics = (water, electricity) => {
  const allMonths = new Set([
    ...Object.keys(water),
    ...Object.keys(electricity),
  ]);

  const sortedMonths = Array.from(allMonths).sort();

  return sortedMonths.map((month) => ({
    month,
    water: water[month]?.totalCost || 0,
    electricity: electricity[month]?.totalCost || 0,
    gas: 0,
    fuel: 0,
    grocery: 0,
  }));
};
