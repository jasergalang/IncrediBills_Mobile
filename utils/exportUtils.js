// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
// import * as XLSX from 'xlsx';

// // Format currency
// const money = (value) => `₱${Number(value || 0).toLocaleString()}`;

// /* =======================
//    PDF EXPORT FOR REACT NATIVE
// ======================= */
// export const exportToPDF = async (analyticsData, userName = null) => {
//   const {
//     kpiData,
//     timeSeriesData,
//     categoryBreakdown,
//     rollingAverages,
//     anomalies,
//     peakUsageData,
//     dateRange,
//     selectedCategories,
//   } = analyticsData;

//   const currentDate = new Date().toLocaleString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });

//   // Generate HTML content for PDF
//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <style>
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
        
//         body {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//           padding: 20px;
//           color: #1e293b;
//           line-height: 1.6;
//         }
        
//         .header {
//           text-align: center;
//           margin-bottom: 30px;
//           border-bottom: 3px solid #2563eb;
//           padding-bottom: 20px;
//         }
        
//         .app-title {
//           font-size: 32px;
//           font-weight: bold;
//           color: #2563eb;
//           margin-bottom: 10px;
//         }
        
//         .report-title {
//           font-size: 24px;
//           font-weight: bold;
//           margin-bottom: 10px;
//         }
        
//         .metadata {
//           font-size: 12px;
//           color: #64748b;
//           margin-top: 10px;
//         }
        
//         .user-name {
//           font-size: 14px;
//           color: #475569;
//           margin-top: 8px;
//         }
        
//         .section {
//           margin-bottom: 30px;
//           page-break-inside: avoid;
//         }
        
//         .section-title {
//           font-size: 18px;
//           font-weight: bold;
//           margin-bottom: 15px;
//           color: #1e293b;
//           border-left: 4px solid #2563eb;
//           padding-left: 10px;
//         }
        
//         table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
//         }
        
//         thead {
//           background-color: #2563eb;
//           color: white;
//         }
        
//         th, td {
//           padding: 12px;
//           text-align: left;
//           border: 1px solid #e2e8f0;
//         }
        
//         th {
//           font-weight: bold;
//           font-size: 13px;
//         }
        
//         td {
//           font-size: 12px;
//         }
        
//         tbody tr:nth-child(even) {
//           background-color: #f8fafc;
//         }
        
//         tbody tr:hover {
//           background-color: #f1f5f9;
//         }
        
//         .metric-label {
//           font-weight: bold;
//         }
        
//         .value-right {
//           text-align: right;
//         }
        
//         .value-center {
//           text-align: center;
//         }
        
//         .positive-change {
//           color: #16a34a;
//           font-weight: bold;
//         }
        
//         .negative-change {
//           color: #dc2626;
//           font-weight: bold;
//         }
        
//         .anomaly-table thead {
//           background-color: #dc2626;
//         }
        
//         .anomaly-severity {
//           font-weight: bold;
//           text-transform: uppercase;
//           color: #dc2626;
//         }
        
//         .chart-placeholder {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           padding: 40px;
//           text-align: center;
//           border-radius: 8px;
//           margin: 20px 0;
//           font-size: 14px;
//         }
        
//         .category-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 15px;
//           margin-top: 15px;
//         }
        
//         .category-card {
//           border: 2px solid #e2e8f0;
//           border-radius: 8px;
//           padding: 15px;
//           background: white;
//         }
        
//         .category-name {
//           font-weight: bold;
//           font-size: 14px;
//           margin-bottom: 5px;
//         }
        
//         .category-amount {
//           font-size: 18px;
//           color: #2563eb;
//           font-weight: bold;
//         }
        
//         .category-percent {
//           font-size: 12px;
//           color: #64748b;
//         }
        
//         .footer {
//           margin-top: 40px;
//           padding-top: 20px;
//           border-top: 2px solid #e2e8f0;
//           text-align: center;
//           font-size: 11px;
//           color: #94a3b8;
//         }
        
//         .page-break {
//           page-break-after: always;
//         }
//       </style>
//     </head>
//     <body>
//       <!-- HEADER -->
//       <div class="header">
//         <div class="app-title">IncrediBills</div>
//         <div class="report-title">Analytics Dashboard Report</div>
//         ${userName ? `<div class="user-name">Prepared for: ${userName}</div>` : ''}
//         <div class="metadata">
//           Generated: ${currentDate}<br>
//           Period: ${dateRange} | Categories: ${selectedCategories.join(', ')}
//         </div>
//       </div>

//       <!-- KPI SECTION -->
//       <div class="section">
//         <div class="section-title">Key Performance Indicators</div>
//         <table>
//           <thead>
//             <tr>
//               <th>Metric</th>
//               <th class="value-right">Value</th>
//               <th class="value-center">Change</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td class="metric-label">Total Spending</td>
//               <td class="value-right">${money(kpiData.totalSpending.current)}</td>
//               <td class="value-center ${kpiData.totalSpending.change >= 0 ? 'positive-change' : 'negative-change'}">
//                 ${kpiData.totalSpending.change}%
//               </td>
//             </tr>
//             <tr>
//               <td class="metric-label">Avg Monthly</td>
//               <td class="value-right">${money(kpiData.avgMonthly.current)}</td>
//               <td class="value-center ${kpiData.avgMonthly.change >= 0 ? 'positive-change' : 'negative-change'}">
//                 ${kpiData.avgMonthly.change}%
//               </td>
//             </tr>
//             <tr>
//               <td class="metric-label">Total Saved</td>
//               <td class="value-right">${money(kpiData.totalSaved.current)}</td>
//               <td class="value-center ${kpiData.totalSaved.change >= 0 ? 'positive-change' : 'negative-change'}">
//                 ${kpiData.totalSaved.change}%
//               </td>
//             </tr>
//             <tr>
//               <td class="metric-label">Efficiency Score</td>
//               <td class="value-right">${kpiData.efficiency.current}%</td>
//               <td class="value-center ${kpiData.efficiency.change >= 0 ? 'positive-change' : 'negative-change'}">
//                 ${kpiData.efficiency.change}%
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <!-- ROLLING AVERAGES -->
//       ${rollingAverages ? `
//       <div class="section">
//         <div class="section-title">Rolling Averages</div>
//         <table>
//           <thead>
//             <tr>
//               <th>Period</th>
//               <th class="value-right">Average</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td class="metric-label">7-Day Average</td>
//               <td class="value-right">${money(rollingAverages.sevenDay)}</td>
//             </tr>
//             <tr>
//               <td class="metric-label">30-Day Average</td>
//               <td class="value-right">${money(rollingAverages.thirtyDay)}</td>
//             </tr>
//             <tr>
//               <td class="metric-label">90-Day Average</td>
//               <td class="value-right">${money(rollingAverages.ninetyDay)}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       ` : ''}

//       <!-- CATEGORY BREAKDOWN -->
//       <div class="section">
//         <div class="section-title">Category Breakdown</div>
//         <div class="category-grid">
//           ${categoryBreakdown.map(cat => `
//             <div class="category-card">
//               <div class="category-name">${cat.category}</div>
//               <div class="category-amount">${money(cat.amount)}</div>
//               <div class="category-percent">${cat.percent}% of total</div>
//             </div>
//           `).join('')}
//         </div>
//       </div>

//       <div class="page-break"></div>

//       <!-- ANOMALIES -->
//       ${anomalies && anomalies.length > 0 ? `
//       <div class="section">
//         <div class="section-title" style="color: #dc2626;">Anomalies Detected</div>
//         <table class="anomaly-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Category</th>
//               <th class="value-right">Normal</th>
//               <th class="value-right">Actual</th>
//               <th class="value-center">Deviation</th>
//               <th class="value-center">Severity</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${anomalies.map(a => `
//               <tr>
//                 <td>${a.date}</td>
//                 <td>${a.category}</td>
//                 <td class="value-right">${money(a.normal)}</td>
//                 <td class="value-right">${money(a.actual)}</td>
//                 <td class="value-center">+${a.deviation}%</td>
//                 <td class="value-center anomaly-severity">${a.severity.toUpperCase()}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//       </div>
//       ` : ''}

//       <!-- MONTHLY TRENDS -->
//       <div class="section">
//         <div class="section-title">Monthly Spending Trends</div>
//         <table>
//           <thead>
//             <tr>
//               <th>Month</th>
//               <th class="value-right">Total Spending</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${timeSeriesData.slice(-12).map(d => `
//               <tr>
//                 <td>${d.month}</td>
//                 <td class="value-right">${money(d.total || d.amount)}</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//         <div class="chart-placeholder">
//           📊 Visual chart representation available in the mobile app
//         </div>
//       </div>

//       <!-- PEAK USAGE -->
//       ${peakUsageData && peakUsageData.length > 0 ? `
//       <div class="section">
//         <div class="section-title">Peak Usage Hours</div>
//         <table>
//           <thead>
//             <tr>
//               <th>Hour</th>
//               <th class="value-right">Usage %</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${peakUsageData.map(p => `
//               <tr>
//                 <td>${p.hour}</td>
//                 <td class="value-right">${p.usage}%</td>
//               </tr>
//             `).join('')}
//           </tbody>
//         </table>
//       </div>
//       ` : ''}

//       <!-- FOOTER -->
//       <div class="footer">
//         Generated by IncrediBills © ${new Date().getFullYear()} | Confidential Report
//       </div>
//     </body>
//     </html>
//   `;

//   try {
//     // Generate PDF using expo-print
//     const { uri } = await Print.printToFileAsync({
//       html: htmlContent,
//       base64: false,
//     });

//     // Generate filename
//     const fileName = userName
//       ? `IncrediBills-Analytics-${userName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
//       : `IncrediBills-Analytics-${new Date().toISOString().split('T')[0]}.pdf`;

//     // Move to a permanent location
//     const pdfUri = `${FileSystem.documentDirectory}${fileName}`;
//     await FileSystem.moveAsync({
//       from: uri,
//       to: pdfUri,
//     });

//     // Share the PDF
//     if (await Sharing.isAvailableAsync()) {
//       await Sharing.shareAsync(pdfUri, {
//         mimeType: 'application/pdf',
//         dialogTitle: 'Share Analytics Report',
//         UTI: 'com.adobe.pdf',
//       });
//     } else {
//       throw new Error('Sharing is not available on this device');
//     }

//     return pdfUri;
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     throw error;
//   }
// };

// /* =======================
//    EXCEL EXPORT FOR REACT NATIVE
// ======================= */
// export const exportToExcel = async (analyticsData, userName = null) => {
//   const {
//     kpiData,
//     categoryBreakdown,
//     timeSeriesData,
//   } = analyticsData;

//   try {
//     // Create workbook
//     const wb = XLSX.utils.book_new();

//     /* Report Info Sheet */
//     const infoData = [
//       ['Application', 'IncrediBills'],
//       ['Report Type', 'Analytics Dashboard'],
//       ['Generated For', userName || 'N/A'],
//       ['Generated Date', new Date().toLocaleString()],
//     ];
//     const infoSheet = XLSX.utils.aoa_to_sheet(infoData);
//     XLSX.utils.book_append_sheet(wb, infoSheet, 'Report Info');

//     /* KPI Sheet */
//     const kpiSheetData = [
//       ['Metric', 'Value', 'Change'],
//       ['Total Spending', kpiData.totalSpending.current, `${kpiData.totalSpending.change}%`],
//       ['Avg Monthly', kpiData.avgMonthly.current, `${kpiData.avgMonthly.change}%`],
//       ['Total Saved', kpiData.totalSaved.current, `${kpiData.totalSaved.change}%`],
//       ['Efficiency Score', `${kpiData.efficiency.current}%`, `${kpiData.efficiency.change}%`],
//     ];
//     const kpiSheet = XLSX.utils.aoa_to_sheet(kpiSheetData);
//     XLSX.utils.book_append_sheet(wb, kpiSheet, 'KPIs');

//     /* Category Sheet */
//     const categoryData = [
//       ['Category', 'Amount', 'Percentage'],
//       ...categoryBreakdown.map(c => [c.category, c.amount, `${c.percent}%`])
//     ];
//     const categorySheet = XLSX.utils.aoa_to_sheet(categoryData);
//     XLSX.utils.book_append_sheet(wb, categorySheet, 'Categories');

//     /* Monthly Trend Sheet */
//     const trendData = [
//       ['Month', 'Total Spending'],
//       ...timeSeriesData.map(d => [d.month, d.total || d.amount])
//     ];
//     const trendSheet = XLSX.utils.aoa_to_sheet(trendData);
//     XLSX.utils.book_append_sheet(wb, trendSheet, 'Monthly Trends');

//     // Write to file
//     const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    
//     const fileName = userName
//       ? `IncrediBills-Analytics-${userName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`
//       : `IncrediBills-Analytics-${new Date().toISOString().split('T')[0]}.xlsx`;

//     const fileUri = `${FileSystem.documentDirectory}${fileName}`;

//     // Write the file
//     await FileSystem.writeAsStringAsync(fileUri, wbout, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     // Share the Excel file
//     if (await Sharing.isAvailableAsync()) {
//       await Sharing.shareAsync(fileUri, {
//         mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         dialogTitle: 'Share Analytics Report',
//         UTI: 'com.microsoft.excel.xlsx',
//       });
//     } else {
//       throw new Error('Sharing is not available on this device');
//     }

//     return fileUri;
//   } catch (error) {
//     console.error('Error generating Excel:', error);
//     throw error;
//   }
// };

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';
import * as XLSX from 'xlsx';

// Format currency
const money = (value) => `₱${Number(value || 0).toLocaleString()}`;

/* =======================
   PDF EXPORT FOR REACT NATIVE
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

  // Build bar chart SVG for monthly spending trends
  const chartData = (timeSeriesData || []).slice(-12);
  const maxAmount = Math.max(...chartData.map((d) => d.amount || d.total || 0), 1);
  const barWidth = chartData.length > 0 ? Math.floor(520 / chartData.length) - 4 : 40;
  const chartHeight = 180;

  const bars = chartData
    .map((d, i) => {
      const amount = d.amount || d.total || 0;
      const barH = Math.round((amount / maxAmount) * chartHeight);
      const x = i * (barWidth + 4) + 2;
      const y = chartHeight - barH;
      return `
        <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" fill="#2563eb" rx="3"/>
        <text x="${x + barWidth / 2}" y="${chartHeight + 14}" text-anchor="middle" font-size="9" fill="#64748b">${d.month || ''}</text>
        <text x="${x + barWidth / 2}" y="${y - 4}" text-anchor="middle" font-size="8" fill="#1e293b">₱${Math.round(amount / 1000)}k</text>
      `;
    })
    .join('');

  // Build category breakdown horizontal bars
  const categoryBars = (categoryBreakdown || [])
    .map((cat) => {
      const pct = cat.percentage ?? cat.percent ?? 0;
      return `
        <div style="margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:13px;font-weight:600;">${cat.icon || ''} ${cat.category}</span>
            <span style="font-size:13px;color:#2563eb;font-weight:700;">${money(cat.amount)} <span style="color:#94a3b8;font-weight:400;">(${pct}%)</span></span>
          </div>
          <div style="background:#e2e8f0;border-radius:6px;height:10px;overflow:hidden;">
            <div style="background:#2563eb;width:${pct}%;height:100%;border-radius:6px;"></div>
          </div>
        </div>
      `;
    })
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 28px 32px;
          color: #1e293b;
          line-height: 1.6;
          background: #f8fafc;
        }
        .header {
          text-align: center;
          margin-bottom: 28px;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 18px;
        }
        .app-title { font-size: 30px; font-weight: 800; color: #2563eb; }
        .report-title { font-size: 18px; font-weight: 600; color: #475569; margin-top: 4px; }
        .metadata { font-size: 11px; color: #94a3b8; margin-top: 8px; }
        .section {
          background: white;
          border-radius: 12px;
          padding: 20px 22px;
          margin-bottom: 22px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .section-title {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
          border-left: 4px solid #2563eb;
          padding-left: 10px;
          margin-bottom: 18px;
        }
        /* KPI Grid */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .kpi-card {
          background: #f1f5f9;
          border-radius: 10px;
          padding: 14px 16px;
        }
        .kpi-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
        .kpi-value { font-size: 22px; font-weight: 800; color: #1e293b; margin-top: 2px; }
        .kpi-change { font-size: 12px; margin-top: 4px; }
        .positive { color: #16a34a; }
        .negative { color: #dc2626; }
        /* Chart */
        svg { display: block; overflow: visible; }
        .chart-wrap { overflow-x: auto; }
        /* Footer */
        .footer {
          text-align: center;
          font-size: 10px;
          color: #94a3b8;
          margin-top: 30px;
          padding-top: 14px;
          border-top: 1px solid #e2e8f0;
        }
      </style>
    </head>
    <body>

      <!-- HEADER -->
      <div class="header">
        <div class="app-title">IncrediBills</div>
        <div class="report-title">Analytics Report</div>
        ${userName ? `<div style="font-size:13px;color:#475569;margin-top:6px;">Prepared for: <strong>${userName}</strong></div>` : ''}
        <div class="metadata">
          Generated: ${currentDate} &nbsp;|&nbsp;
          Categories: ${(selectedCategories || ['all']).join(', ')}
        </div>
      </div>

      <!-- KPI SECTION -->
      <div class="section">
        <div class="section-title">Key Performance Indicators</div>
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-label">Total Spending</div>
            <div class="kpi-value">${money(totalSpending)}</div>
            ${change !== null ? `<div class="kpi-change ${change >= 0 ? 'negative' : 'positive'}">${change >= 0 ? '▲' : '▼'} ${Math.abs(change)}% vs last month</div>` : ''}
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Avg Monthly</div>
            <div class="kpi-value">${money(avgMonthly)}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Total Saved</div>
            <div class="kpi-value">${money(totalSaved)}</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-label">Efficiency Score</div>
            <div class="kpi-value">${efficiency}%</div>
          </div>
        </div>
      </div>

      <!-- CATEGORY BREAKDOWN -->
      <div class="section">
        <div class="section-title">Category Breakdown</div>
        <div style="margin-bottom:12px;font-size:12px;color:#64748b;">
          Total: <strong style="color:#1e293b;">${money(totalAmount)}</strong>
        </div>
        ${categoryBars || '<p style="color:#94a3b8;font-size:13px;">No category data available.</p>'}
      </div>

      <!-- MONTHLY SPENDING TRENDS CHART -->
      <div class="section">
        <div class="section-title">Monthly Spending Trends</div>
        ${
          chartData.length > 0
            ? `
          <div class="chart-wrap">
            <svg width="${chartData.length * (barWidth + 4)}" height="${chartHeight + 28}" xmlns="http://www.w3.org/2000/svg">
              ${bars}
            </svg>
          </div>
          `
            : '<p style="color:#94a3b8;font-size:13px;">No trend data available.</p>'
        }
      </div>

      <!-- FOOTER -->
      <div class="footer">
        Generated by IncrediBills &copy; ${new Date().getFullYear()} &nbsp;|&nbsp; Confidential Report
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
    const wb = XLSX.utils.book_new();

    /* Report Info Sheet */
    const infoData = [
      ['Application', 'IncrediBills'],
      ['Report Type', 'Analytics Dashboard'],
      ['Generated For', userName || 'N/A'],
      ['Generated Date', new Date().toLocaleString()],
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(infoData), 'Report Info');

    /* KPI Sheet */
    const kpiSheetData = [
      ['Metric', 'Value', 'Change vs Last Month'],
      ['Total Spending', val('totalSpending'), chg('totalSpending')],
      ['Avg Monthly', val('avgMonthly'), chg('avgMonthly')],
      ['Total Saved', val('totalSaved'), chg('totalSaved')],
      ['Efficiency Score', `${val('efficiency')}%`, chg('efficiency')],
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(kpiSheetData), 'KPIs');

    /* Category Sheet */
    const categoryData = [
      ['Category', 'Amount', 'Percentage'],
      ...(categoryBreakdown || []).map((c) => [
        c.category,
        c.amount,
        `${c.percentage ?? c.percent ?? 0}%`,
      ]),
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(categoryData), 'Categories');

    /* Monthly Trend Sheet */
    const trendData = [
      ['Month', 'Total Spending'],
      ...(timeSeriesData || []).map((d) => [d.month, d.amount || d.total || 0]),
    ];
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(trendData), 'Monthly Trends');

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