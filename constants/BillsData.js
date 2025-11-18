export const utilities = [
  {
    id: "water",
    name: "Water",
    icon: "💧",
    color: "blue",
    backgroundColor: "#dbeafe", // solid color instead of gradient
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

export const monthlyData = [
  {
    month: "Jun",
    water: 500,
    electricity: 2900,
    gas: 540,
    fuel: 1150,
    grocery: 3800,
  },
  {
    month: "Jul",
    water: 480,
    electricity: 2750,
    gas: 560,
    fuel: 1180,
    grocery: 3600,
  },
  {
    month: "Aug",
    water: 520,
    electricity: 3050,
    gas: 535,
    fuel: 1220,
    grocery: 3900,
  },
  {
    month: "Sep",
    water: 510,
    electricity: 2850,
    gas: 550,
    fuel: 1190,
    grocery: 3700,
  },
  {
    month: "Oct",
    water: 530,
    electricity: 3100,
    gas: 525,
    fuel: 1240,
    grocery: 3550,
  },
  {
    month: "Nov",
    water: 450,
    electricity: 2850,
    gas: 550,
    fuel: 1200,
    grocery: 3500,
  },
];


export const formatDate = (date) => {
  if (!date) return "Unknown Date";
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export const transformBills = (electricData, waterData) => {
  const formattedElectric = electricData.bills.map(b => ({
    id: b._id,
    type: "electricity",
    name: "Electricity",
    icon: "⚡",
    provider: "Meralco",
    amount: b.cost || 0,
    dueDate: formatDate(b.date),
    status: b.status,
    color: "amber",
    createdAt: b.createdAt
  }));

  const formattedWater = waterData.bills.map(b => ({
    id: b._id,
    type: "water",
    name: "Water",
    icon: "💧",
    provider: "Manila Water",
    amount: b.cost || 0,
    dueDate: formatDate(b.date),
    status: b.status,
    color: "blue",
    createdAt: b.createdAt
  }));

  return [...formattedElectric, ...formattedWater].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
};
