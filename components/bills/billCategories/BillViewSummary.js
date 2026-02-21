import React from "react";
import { Card, ViewRow, StatusViewRow } from "./BillModalCard";

export function BillViewSummary({ bill, type, headerColor, displayAmount, rawCost, rawStatus }) {
  if (type === "electricity") {
    return (
      <Card emoji="📊" title="Bill Summary">
        <ViewRow label="Provider" value={bill.provider} headerColor={headerColor} />
        <ViewRow label="Bill Date" value={bill.date} headerColor={headerColor} />
        <ViewRow label="Amount" value={displayAmount(rawCost)} colored headerColor={headerColor} />
        <ViewRow label="Consumption" value={bill.consumption != null ? `${bill.consumption} kWh` : null} headerColor={headerColor} />
        <StatusViewRow label="Status" value={rawStatus} last />
      </Card>
    );
  }

  if (type === "water") {
    return (
      <Card emoji="📊" title="Bill Summary">
        <ViewRow label="Provider" value={bill.provider} headerColor={headerColor} />
        <ViewRow label="Bill Date" value={bill.date} headerColor={headerColor} />
        <ViewRow label="Amount" value={displayAmount(rawCost)} colored headerColor={headerColor} />
        <ViewRow label="Consumption" value={bill.consumption != null ? `${bill.consumption} m³` : null} headerColor={headerColor} />
        <StatusViewRow label="Status" value={rawStatus} last />
      </Card>
    );
  }

  if (type === "grocery") {
    return (
      <Card emoji="📊" title="Bill Summary">
        <ViewRow label="Store" value={bill.store ?? bill.provider} headerColor={headerColor} />
        <ViewRow label="Bill Date" value={bill.date} headerColor={headerColor} />
        <ViewRow label="Amount" value={displayAmount(rawCost)} colored headerColor={headerColor} />
        <ViewRow label="Total Items" value={bill.quantity != null ? String(bill.quantity) : null} headerColor={headerColor} />
        <StatusViewRow label="Status" value={rawStatus} last />
      </Card>
    );
  }

  if (type === "miscellaneous") {
    return (
      <Card emoji="📊" title="Bill Summary">
        <ViewRow label="Category" value={bill.category} headerColor={headerColor} />
        <ViewRow label="Purchase Type" value={bill.purchaseType} headerColor={headerColor} />
        <ViewRow label="Date" value={bill.date} headerColor={headerColor} />
        <ViewRow label="Cost" value={displayAmount(rawCost)} colored headerColor={headerColor} />
        <StatusViewRow label="Payment Status" value={rawStatus} last />
      </Card>
    );
  }

  if (type === "kitchenGas") {
    return (
      <Card emoji="📊" title="Bill Summary">
        <ViewRow label="Provider" value={bill.provider} headerColor={headerColor} />
        <ViewRow label="Bill Date" value={bill.date} headerColor={headerColor} />
        <ViewRow label="Cylinder Size" value={bill.cylinderSize} headerColor={headerColor} />
        <ViewRow label="Amount" value={displayAmount(rawCost)} colored headerColor={headerColor} />
        <StatusViewRow label="Status" value={rawStatus} last />
      </Card>
    );
  }

  if (type === "fuel") {
    return (
      <Card emoji="📊" title="Bill Summary">
        <ViewRow label="Provider" value={bill.provider} headerColor={headerColor} />
        <ViewRow label="Station Location" value={bill.stationLocation} headerColor={headerColor} />
        <ViewRow label="Date" value={bill.date} headerColor={headerColor} />
        <ViewRow label="Amount" value={displayAmount(rawCost)} colored headerColor={headerColor} />
        <ViewRow label="Liters" value={bill.liters != null ? `${bill.liters} L` : null} headerColor={headerColor} last />
      </Card>
    );
  }

  // Fallback
  return (
    <Card emoji="📊" title="Bill Summary">
      <ViewRow label="Provider" value={bill.provider} headerColor={headerColor} />
      <ViewRow label="Date" value={bill.date} headerColor={headerColor} />
      <ViewRow label="Amount" value={displayAmount(rawCost)} colored headerColor={headerColor} />
      <StatusViewRow label="Status" value={rawStatus} last />
    </Card>
  );
}