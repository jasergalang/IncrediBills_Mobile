import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text, ScrollView, Modal, Pressable } from "react-native";

export default function FiltersPanel({
  selectedCategories,
  toggleCategory,
  onExportPDF,
  onExportExcel,
}) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  const categories = [
    { id: "all",           name: "All",          icon: "📊" },
    { id: "water",         name: "Water",         icon: "💧" },
    { id: "electricity",   name: "Electricity",   icon: "⚡" },
    { id: "fuel",          name: "Transport",     icon: "🚗" },
    { id: "grocery",       name: "Groceries",     icon: "🛒" },
    { id: "miscellaneous", name: "Miscellaneous", icon: "📦" },
    { id: "kitchenGas",    name: "Kitchen Gas",   icon: "🔥" },
  ];

  const handleExport = async (type) => {
    setShowExportMenu(false);
    setIsExporting(true);
    setExportType(type);
    try {
      if (type === "pdf") await onExportPDF?.();
      else await onExportExcel?.();
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <View className="bg-white rounded-2xl border border-slate-200 mx-4 p-4 mb-4">

      {/* Header row: title + download button */}
      <View className="flex-row items-start justify-between mb-4">
        <View>
          <Text className="text-lg font-bold text-slate-900 mb-1">
            Filter by Category
          </Text>
          <Text className="text-xs text-slate-600">
            Select categories to analyze
          </Text>
        </View>

        {/* Download Reports button + dropdown */}
        <View style={{ position: "relative", zIndex: 100 }}>
          <TouchableOpacity
            onPress={() => setShowExportMenu(!showExportMenu)}
            disabled={isExporting}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 10,
              backgroundColor: isExporting ? "#e2e8f0" : "#7c3aed",
              opacity: isExporting ? 0.7 : 1,
            }}
          >
            <Text style={{ fontSize: 13 }}>
              {isExporting ? "⏳" : "📥"}
            </Text>
            <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
              {isExporting
                ? `${exportType === "pdf" ? "PDF" : "Excel"}...`
                : "Download"}
            </Text>
            {!isExporting && (
              <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>
                {showExportMenu ? "▲" : "▼"}
              </Text>
            )}
          </TouchableOpacity>

          {/* Dropdown */}
          {showExportMenu && !isExporting && (
            <>
              {/* Backdrop to close on outside tap */}
              <Pressable
                onPress={() => setShowExportMenu(false)}
                style={{
                  position: "absolute",
                  top: -1000,
                  left: -1000,
                  right: -1000,
                  bottom: -1000,
                  zIndex: 98,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  right: 0,
                  top: 42,
                  width: 180,
                  backgroundColor: "white",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 8,
                  elevation: 10,
                  zIndex: 999,
                  overflow: "hidden",
                }}
              >
                {/* PDF option */}
                <TouchableOpacity
                  onPress={() => handleExport("pdf")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>📄</Text>
                  <View>
                    <Text style={{ fontSize: 13, fontWeight: "600", color: "#1e293b" }}>
                      Export as PDF
                    </Text>
                    <Text style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>
                      Full analytics report
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: "#f1f5f9" }} />

                {/* Excel option */}
                <TouchableOpacity
                  onPress={() => handleExport("excel")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>📊</Text>
                  <View>
                    <Text style={{ fontSize: 13, fontWeight: "600", color: "#1e293b" }}>
                      Export as Excel
                    </Text>
                    <Text style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>
                      Spreadsheet with data
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Category filter pills */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-2">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => toggleCategory(category.id)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategories.includes(category.id)
                  ? "bg-blue-600"
                  : "bg-slate-100"
              }`}
            >
              <Text
                className={`font-semibold text-sm ${
                  selectedCategories.includes(category.id)
                    ? "text-white"
                    : "text-slate-600"
                }`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}