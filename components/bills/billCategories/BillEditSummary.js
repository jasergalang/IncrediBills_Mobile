import React from "react";
import { TextInput } from "react-native";
import { Card, EditRow, StatusToggleRow } from "./BillModalCard";

export function BillEditSummary({ type, fields, setters }) {
    const {
        provider, amount, status, date,
        consumption, billingPeriod,
        store, category, quantity,
        purchaseType, stationLocation, liters,
        cylinders, cylinderSize, cycleDays,
        feedback,
    } = fields;

    const {
        setProvider, setAmount, setStatus, setDate,
        setConsumption, setBillingPeriod,
        setStore, setCategory, setQuantity,
        setPurchaseType, setStationLocation, setLiters,
        setCylinders, setCylinderSize, setCycleDays,
        setFeedback,
    } = setters;

    if (type === "electricity" || type === "water") {
        const unit = type === "electricity" ? "kWh" : "m³";
        return (
            <Card emoji="📊" title="Bill Summary" showEditingBadge>
                <EditRow label="Provider" value={provider} onChangeText={setProvider} placeholder="Provider name" />
                <EditRow label="Cost (₱)" value={amount} onChangeText={setAmount} keyboardType="numeric" prefix="₱" />
                <EditRow label={`Consumption (${unit})`} value={consumption} onChangeText={setConsumption} keyboardType="numeric" placeholder={`e.g. 120 ${unit}`} />
                <StatusToggleRow label="Status" value={status} onChange={setStatus} />
                <EditRow label="Bill Date" value={date} onChangeText={setDate} placeholder="MM/DD/YYYY" />
                <EditRow label="Billing Period" value={billingPeriod} onChangeText={setBillingPeriod} placeholder="e.g. Jan 2026" last />
            </Card>
        );
    }

    if (type === "grocery") {
        return (
            <Card emoji="📊" title="Bill Summary" showEditingBadge>
                <EditRow label="Cost (₱)" value={amount} onChangeText={setAmount} keyboardType="numeric" prefix="₱" />
                <EditRow label="Category" value={category} onChangeText={setCategory} placeholder="e.g. Produce" />
                <EditRow label="Store" value={store} onChangeText={setStore} placeholder="Store name" />
                <EditRow label="Quantity" value={quantity} onChangeText={setQuantity} keyboardType="numeric" placeholder="No. of items" />
                <StatusToggleRow label="Payment Status" value={status} onChange={setStatus} />
                <EditRow label="Date" value={date} onChangeText={setDate} placeholder="MM/DD/YYYY" last />
            </Card>
        );
    }

    if (type === "miscellaneous") {
        return (
            <Card emoji="📊" title="Bill Summary" showEditingBadge>
                <EditRow label="Cost (₱)" value={amount} onChangeText={setAmount} keyboardType="numeric" prefix="₱" />
                <EditRow label="Category" value={category} onChangeText={setCategory} placeholder="e.g. Repairs" />
                <EditRow label="Purchase Type" value={purchaseType} onChangeText={setPurchaseType} placeholder="e.g. Online" />
                <StatusToggleRow label="Payment Status" value={status} onChange={setStatus} />
                <EditRow label="Date" value={date} onChangeText={setDate} placeholder="MM/DD/YYYY" last />
            </Card>
        );
    }

    if (type === "fuel") {
        return (
            <Card emoji="📊" title="Bill Summary" showEditingBadge>
                <EditRow label="Cost (₱)" value={amount} onChangeText={setAmount} keyboardType="numeric" prefix="₱" />
                <EditRow label="Liters" value={liters} onChangeText={setLiters} keyboardType="numeric" placeholder="e.g. 20" />
                <EditRow label="Provider" value={provider} onChangeText={setProvider} placeholder="e.g. Shell" />
                <EditRow label="Station Location" value={stationLocation} onChangeText={setStationLocation} placeholder="e.g. EDSA, QC" />
                <StatusToggleRow label="Payment Status" value={status} onChange={setStatus} />
                <EditRow label="Date" value={date} onChangeText={setDate} placeholder="MM/DD/YYYY" last />
            </Card>
        );
    }

    if (type === "kitchenGas") {
        return (
            <Card emoji="📊" title="Bill Summary" showEditingBadge>
                <EditRow label="Cost (₱)" value={amount} onChangeText={setAmount} keyboardType="numeric" prefix="₱" />
                <EditRow label="Provider" value={provider} onChangeText={setProvider} placeholder="e.g. Gasul" />
                <EditRow label="Cylinders" value={cylinders} onChangeText={setCylinders} keyboardType="numeric" placeholder="e.g. 1" />
                <EditRow label="Cylinder Size" value={cylinderSize} onChangeText={setCylinderSize} placeholder="e.g. 11kg" />
                <EditRow label="Cycle Days" value={cycleDays} onChangeText={setCycleDays} keyboardType="numeric" placeholder="e.g. 30" />
                <StatusToggleRow label="Payment Status" value={status} onChange={setStatus} />
                <EditRow label="Date" value={date} onChangeText={setDate} placeholder="MM/DD/YYYY" last />
            </Card>
        );
    }

    // Fallback
    return (
        <Card emoji="📊" title="Bill Summary" showEditingBadge>
            <EditRow label="Provider" value={provider} onChangeText={setProvider} />
            <EditRow label="Cost (₱)" value={amount} onChangeText={setAmount} keyboardType="numeric" prefix="₱" />
            <StatusToggleRow label="Status" value={status} onChange={setStatus} />
            <EditRow label="Date" value={date} onChangeText={setDate} placeholder="MM/DD/YYYY" last />
        </Card>
    );
}