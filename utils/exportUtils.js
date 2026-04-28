import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
//import * as XLSX from 'xlsx';


// Format currency
const money = (value) => `₱${Number(value || 0).toLocaleString()}`;

/* =======================
   PDF EXPORT FOR REACT NATIVE
   Design mirrors the web jsPDF layout:
   - Page 1: Header → KPI table → Category Breakdown table
   - Page 2: Monthly Spending Trends (stacked bar SVG) + Category pie-style bars
======================= */
export const exportToPDF = async (analyticsData, userName = null) => {
  const {
    kpiData,
    timeSeriesData,
    categoryBreakdown,
    dateRange,
    selectedCategories,
    totalAmount,
  } = analyticsData;

  // Support both flat (utilityKPI) and nested kpiData shapes
  const totalSpending =
    typeof kpiData.totalSpending === 'object'
      ? kpiData.totalSpending.current
      : kpiData.totalSpending;
  const avgMonthly =
    typeof kpiData.avgMonthly === 'object'
      ? kpiData.avgMonthly.current
      : kpiData.avgMonthly;
  const totalSaved =
    typeof kpiData.totalSaved === 'object'
      ? kpiData.totalSaved.current
      : kpiData.totalSaved;
  const efficiency =
    typeof kpiData.efficiency === 'object'
      ? kpiData.efficiency.current
      : kpiData.efficiency;
  const change =
    typeof kpiData.change === 'number'
      ? kpiData.change
      : typeof kpiData.totalSpending === 'object'
      ? kpiData.totalSpending.change
      : null;

  const currentDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // ── Shared chart data ─────────────────────────────────────────────────────
  const chartData = (timeSeriesData || []).slice(-12);

  const legendItems = [
    { label: 'Water',         color: '#3b82f6' },
    { label: 'Electricity',   color: '#f59e0b' },
    { label: 'Groceries',     color: '#10b981' },
    { label: 'Transport',     color: '#6b7280' },
    { label: 'Miscellaneous', color: '#f97316' },
    { label: 'Kitchen Gas',   color: '#ef4444' },
  ];

  // ── KPI table rows ────────────────────────────────────────────────────────
  const kpiRows = [
    ['Total Spending', money(totalSpending), change !== null ? `${change >= 0 ? '+' : ''}${change}%` : '—'],
    ['Avg Monthly', money(avgMonthly), '—'],
    ['Total Saved', money(totalSaved), '—'],
    ['Efficiency Score', `${efficiency}%`, '—'],
  ];

  const kpiTableRows = kpiRows
    .map(
      ([metric, value, chg], i) => `
      <tr style="background:${i % 2 === 0 ? '#f8fafc' : '#ffffff'};">
        <td style="padding:9px 14px;font-weight:600;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${metric}</td>
        <td style="padding:9px 14px;text-align:right;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${value}</td>
        <td style="padding:9px 14px;text-align:center;font-size:13px;color:${chg.startsWith('+') || (chg !== '—' && !chg.startsWith('-')) ? '#dc2626' : chg.startsWith('-') ? '#16a34a' : '#94a3b8'};font-weight:600;border-bottom:1px solid #e2e8f0;">${chg}</td>
      </tr>`
    )
    .join('');

  // ── Category table rows ───────────────────────────────────────────────────
  const categoryTableRows = (categoryBreakdown || [])
    .map(
      (cat, i) => `
      <tr style="background:${i % 2 === 0 ? '#f8fafc' : '#ffffff'};">
        <td style="padding:9px 14px;font-weight:600;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${cat.icon || ''} ${cat.category}</td>
        <td style="padding:9px 14px;text-align:right;font-size:13px;color:#1e293b;border-bottom:1px solid #e2e8f0;">${money(cat.amount)}</td>
        <td style="padding:9px 14px;text-align:center;font-size:13px;color:#475569;border-bottom:1px solid #e2e8f0;">${cat.percentage ?? cat.percent ?? 0}%</td>
      </tr>`
    )
    .join('');

  // ── Category Breakdown: Horizontal Bar Chart SVG (full width) ──────────────
  const CAT_CHART_W = 680;
  const CAT_BAR_H = 28;
  const CAT_GAP = 14;
  const CAT_LABEL_W = 120;
  const CAT_VALUE_W = 70;
  const CAT_BAR_AREA = CAT_CHART_W - CAT_LABEL_W - CAT_VALUE_W - 16;
  const catTotal = (categoryBreakdown || []).reduce((s, c) => s + (c.amount || 0), 0) || 1;

  const catBars = (categoryBreakdown || []).map((cat, i) => {
    const pct = cat.percentage ?? cat.percent ?? Math.round((cat.amount / catTotal) * 100);
    const barW = Math.round((pct / 100) * CAT_BAR_AREA);
    const y = i * (CAT_BAR_H + CAT_GAP);
    const colors = {
      Electricity: '#f59e0b', Groceries: '#10b981', Transport: '#6b7280',
      Miscellaneous: '#f97316', Water: '#3b82f6', 'Kitchen Gas': '#ef4444',
    };
    const color = colors[cat.category] || '#2563eb';
    return `
      <g transform="translate(0, ${y})">
        <text x="${CAT_LABEL_W - 8}" y="${CAT_BAR_H / 2 + 5}" text-anchor="end" font-size="12" font-weight="600" fill="#1e293b">${cat.icon || ''} ${cat.category}</text>
        <rect x="${CAT_LABEL_W}" y="4" width="${CAT_BAR_AREA}" height="${CAT_BAR_H - 8}" fill="#f1f5f9" rx="4"/>
        <rect x="${CAT_LABEL_W}" y="4" width="${Math.max(barW, 2)}" height="${CAT_BAR_H - 8}" fill="${color}" rx="4"/>
        <text x="${CAT_LABEL_W + CAT_BAR_AREA + 10}" y="${CAT_BAR_H / 2 + 5}" font-size="11" font-weight="700" fill="#1e293b">₱${Math.round(cat.amount).toLocaleString()}</text>
        <text x="${CAT_LABEL_W + CAT_BAR_AREA + 10}" y="${CAT_BAR_H / 2 + 17}" font-size="10" fill="#64748b">${pct}%</text>
      </g>`;
  }).join('');

  const catChartHeight = (categoryBreakdown || []).length * (CAT_BAR_H + CAT_GAP) + 10;

  // ── Monthly Trends: full-width stacked bar (recalculate for wider canvas) ──
  const TREND_W = 680;
  const TREND_H = 220;
  const tBarCount = chartData.length || 1;
  const tBarWidth = Math.floor(TREND_W / tBarCount) - 8;

  const tMaxAmount = Math.max(
    ...chartData.map((d) =>
      (d.water || 0) + (d.electricity || 0) + (d.groceries || 0) +
      (d.transport || 0) + (d.miscellaneous || 0) + (d.kitchenGas || 0) ||
      d.amount || d.total || 0
    ), 1
  );

  const tStackedBars = chartData.map((d, i) => {
    const x = i * (tBarWidth + 8) + 2;
    const segments = [
      { val: d.water || 0,         color: '#3b82f6' },
      { val: d.electricity || 0,   color: '#f59e0b' },
      { val: d.groceries || 0,     color: '#10b981' },
      { val: d.transport || 0,     color: '#6b7280' },
      { val: d.miscellaneous || 0, color: '#f97316' },
      { val: d.kitchenGas || 0,    color: '#ef4444' },
    ].filter((s) => s.val > 0);

    const total = segments.length > 0
      ? segments.reduce((s, seg) => s + seg.val, 0)
      : d.amount || d.total || 0;

    let curY = TREND_H;
    const rects = segments.length > 0
      ? segments.map((seg) => {
          const h = Math.max(Math.round((seg.val / tMaxAmount) * TREND_H), 1);
          curY -= h;
          return `<rect x="${x}" y="${curY}" width="${tBarWidth}" height="${h}" fill="${seg.color}" rx="2"/>`;
        }).join('')
      : (() => {
          const h = Math.round((total / tMaxAmount) * TREND_H);
          return `<rect x="${x}" y="${TREND_H - h}" width="${tBarWidth}" height="${h}" fill="#2563eb" rx="2"/>`;
        })();

    const topY = TREND_H - Math.round((total / tMaxAmount) * TREND_H);
    const totalLabel = total >= 1000 ? `₱${Math.round(total / 1000)}k` : `₱${Math.round(total)}`;

    return `
      ${rects}
      <text x="${x + tBarWidth / 2}" y="${TREND_H + 15}" text-anchor="middle" font-size="10" fill="#64748b">${d.month || ''}</text>
      <text x="${x + tBarWidth / 2}" y="${topY - 5}" text-anchor="middle" font-size="9" fill="#1e293b">${totalLabel}</text>`;
  }).join('');

  // ── Full HTML ─────────────────────────────────────────────────────────────
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        @page { margin: 0; size: A4 landscape; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
          color: #1e293b;
          background: #ffffff;
        }

        .page {
          width: 100%;
          min-height: 100vh;
          padding: 32px 40px 28px;
          page-break-after: always;
        }
        .page:last-child { page-break-after: avoid; }

        /* ── PAGE 1 HEADER ── */
        .header { text-align: center; margin-bottom: 24px; }
        .app-title { font-size: 30px; font-weight: 800; color: #2563eb; letter-spacing: -0.5px; }
        .report-title { font-size: 18px; font-weight: 600; color: #1e293b; margin-top: 4px; }
        .divider { border: none; border-top: 2px solid #2563eb; margin: 10px 60px; }
        .prepared-for { font-size: 14px; color: #475569; margin-top: 8px; }
        .prepared-for strong { color: #1e293b; font-size: 16px; }
        .meta { font-size: 11px; color: #6b7280; margin-top: 5px; line-height: 1.9; }

        /* ── PAGE 2 MINI HEADER ── */
        .page2-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 24px; padding-bottom: 12px; border-bottom: 2px solid #2563eb;
        }
        .page2-brand { font-size: 18px; font-weight: 800; color: #2563eb; }
        .page2-brand span { font-size: 11px; font-weight: 400; color: #94a3b8; display: block; }
        .page2-user { text-align: center; }
        .page2-user strong { font-size: 14px; color: #1e293b; display: block; }
        .page2-user span { font-size: 11px; color: #64748b; }
        .page2-pagenum { font-size: 11px; color: #94a3b8; text-align: right; }

        /* ── SECTION ── */
        .section { margin-bottom: 28px; }
        .section-title { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 12px; }

        /* ── TABLES ── */
        table { width: 100%; border-collapse: collapse; border: 1px solid #e2e8f0; }
        thead tr { background: #2563eb; }
        thead th {
          padding: 10px 14px; text-align: left;
          font-size: 12px; font-weight: 700; color: #ffffff; letter-spacing: 0.3px;
        }
        thead th:nth-child(2) { text-align: right; }
        thead th:nth-child(3) { text-align: center; }

        svg { display: block; overflow: visible; }

        .footer {
          text-align: center; font-size: 10px; color: #9ca3af;
          margin-top: 28px; padding-top: 12px; border-top: 1px solid #e2e8f0;
        }

        /* ── LEGEND ── */
        .legend { display: flex; flex-wrap: wrap; gap: 6px 18px; margin-bottom: 12px; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11px; color: #475569; }
        .legend-dot { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }
      </style>
    </head>
    <body>

      <!-- ══════════════════════════════════════
           PAGE 1 — Header + KPI + Category Tables
      ══════════════════════════════════════ -->
      <div class="page">

        <div class="header">
          <div class="app-title">IncrediBills</div>
          <div class="report-title">Analytics Dashboard Report</div>
          <hr class="divider"/>
          ${userName ? `<div class="prepared-for">Prepared for: <strong>${userName}</strong></div>` : ''}
          <div class="meta">
            Generated: ${currentDate} &nbsp;|&nbsp;
            Period: ${dateRange || 'all'} &nbsp;|&nbsp;
            Categories: ${(selectedCategories || ['all']).join(', ')}
          </div>
        </div>

        <!-- KPI TABLE -->
        <div class="section">
          <div class="section-title">Key Performance Indicators</div>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th style="text-align:right;">Value</th>
                <th style="text-align:center;">Change</th>
              </tr>
            </thead>
            <tbody>${kpiTableRows}</tbody>
          </table>
        </div>

        <!-- CATEGORY BREAKDOWN TABLE -->
        <div class="section">
          <div class="section-title">Category Breakdown</div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th style="text-align:right;">Amount</th>
                <th style="text-align:center;">Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${categoryTableRows || '<tr><td colspan="3" style="padding:12px;text-align:center;color:#94a3b8;">No data available</td></tr>'}
            </tbody>
          </table>
        </div>

        <div class="footer">
          Generated by IncrediBills &copy; ${new Date().getFullYear()} &nbsp;|&nbsp; Confidential Report &nbsp;|&nbsp; Page 1
        </div>
      </div>

      <!-- ══════════════════════════════════════
           PAGE 2 — Charts (Monthly Trends + Category Breakdown)
      ══════════════════════════════════════ -->
      <div class="page">

        <div class="page2-header">
          <div class="page2-brand">
            IncrediBills
            <span>Visual Analytics</span>
          </div>
          ${userName
            ? `<div class="page2-user"><strong>${userName}</strong><span>Analytics Report</span></div>`
            : '<div></div>'}
          <div class="page2-pagenum">Page 2</div>
        </div>

        <!-- MONTHLY SPENDING TRENDS CHART -->
        <div class="section">
          <div class="section-title">Monthly Spending Trends (incl. Kitchen Gas)</div>
          <!-- Legend -->
          <div class="legend">
            ${legendItems.map(item => `
              <div class="legend-item">
                <div class="legend-dot" style="background:${item.color};"></div>
                ${item.label}
              </div>`).join('')}
          </div>
          ${chartData.length > 0
            ? `<svg width="${Math.max(tBarCount * (tBarWidth + 8), TREND_W)}" height="${TREND_H + 28}" xmlns="http://www.w3.org/2000/svg">
                ${tStackedBars}
               </svg>`
            : '<p style="color:#94a3b8;font-size:13px;">No trend data available.</p>'}
        </div>

        <!-- CATEGORY BREAKDOWN CHART -->
        <div class="section">
          <div class="section-title">Category Breakdown</div>
          ${(categoryBreakdown || []).length > 0
            ? `<svg width="${CAT_CHART_W}" height="${catChartHeight}" xmlns="http://www.w3.org/2000/svg">
                ${catBars}
               </svg>`
            : '<p style="color:#94a3b8;font-size:13px;">No category data available.</p>'}
        </div>

        <div class="footer">
          Generated by IncrediBills &copy; ${new Date().getFullYear()} &nbsp;|&nbsp; Confidential Report &nbsp;|&nbsp; Page 2
        </div>
      </div>

    </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    const fileName = userName
      ? `IncrediBills-Analytics-${userName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
      : `IncrediBills-Analytics-${new Date().toISOString().split('T')[0]}.pdf`;

    const pdfUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.moveAsync({ from: uri, to: pdfUri });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(pdfUri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Share Analytics Report',
        UTI: 'com.adobe.pdf',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }

    return pdfUri;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/* =======================
   EXCEL EXPORT FOR REACT NATIVE
   Mirrors web sheet structure (no rolling averages sheet)
======================= */
export const exportToExcel = async (analyticsData, userName = null) => {
  const { kpiData, categoryBreakdown, timeSeriesData } = analyticsData;

  // Support both flat and nested kpiData shapes
  const val = (field, fallback = 0) => {
    const v = kpiData[field];
    return typeof v === 'object' ? v.current : v ?? fallback;
  };
  const chg = (field) => {
    const v = kpiData[field];
    return typeof v === 'object' ? `${v.change}%` : field === 'change' ? `${kpiData.change}%` : 'N/A';
  };

  try {
    const XLSX = await import('xlsx');
    const wb = XLSX.utils.book_new();

    /* Report Info Sheet */
    const infoData = [
      { Field: 'Application', Value: 'IncrediBills' },
      { Field: 'Report Type', Value: 'Analytics Dashboard' },
      { Field: 'Generated For', Value: userName || 'N/A' },
      { Field: 'Generated Date', Value: new Date().toLocaleString() },
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(infoData), 'Report Info');

    /* KPI Sheet */
    const kpiSheetData = [
      { Metric: 'Total Spending', Value: val('totalSpending'), Change: chg('totalSpending') },
      { Metric: 'Avg Monthly', Value: val('avgMonthly'), Change: chg('avgMonthly') },
      { Metric: 'Total Saved', Value: val('totalSaved'), Change: chg('totalSaved') },
      { Metric: 'Efficiency Score', Value: `${val('efficiency')}%`, Change: chg('efficiency') },
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(kpiSheetData), 'KPIs');

    /* Category Sheet — mirrors web (Category, Amount, Percentage) */
    const categoryData = (categoryBreakdown || []).map((c) => ({
      Category: c.category,
      Amount: c.amount,
      Percentage: `${c.percentage ?? c.percent ?? 0}%`,
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(categoryData), 'Categories');

    /* Monthly Trend Sheet — mirrors web columns including kitchenGas */
    const trendData = (timeSeriesData || []).map((d) => ({
      Month: d.month,
      Water: d.water || 0,
      Electricity: d.electricity || 0,
      Groceries: d.groceries || 0,
      Transport: d.transport || 0,
      Miscellaneous: d.miscellaneous || 0,
      'Kitchen Gas': d.kitchenGas || 0,
      Total: d.amount || d.total || 0,
    }));
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(trendData), 'Monthly Trends');

    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });

    const fileName = userName
      ? `IncrediBills-Analytics-${userName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`
      : `IncrediBills-Analytics-${new Date().toISOString().split('T')[0]}.xlsx`;

    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Share Analytics Report',
        UTI: 'com.microsoft.excel.xlsx',
      });
    } else {
      throw new Error('Sharing is not available on this device');
    }

    return fileUri;
  } catch (error) {
    console.error('Error generating Excel:', error);
    throw error;
  }
};