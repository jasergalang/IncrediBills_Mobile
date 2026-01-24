import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
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
    rollingAverages,
    anomalies,
    peakUsageData,
    dateRange,
    selectedCategories,
  } = analyticsData;

  const currentDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Generate HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          padding: 20px;
          color: #1e293b;
          line-height: 1.6;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
        }
        
        .app-title {
          font-size: 32px;
          font-weight: bold;
          color: #2563eb;
          margin-bottom: 10px;
        }
        
        .report-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .metadata {
          font-size: 12px;
          color: #64748b;
          margin-top: 10px;
        }
        
        .user-name {
          font-size: 14px;
          color: #475569;
          margin-top: 8px;
        }
        
        .section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #1e293b;
          border-left: 4px solid #2563eb;
          padding-left: 10px;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        thead {
          background-color: #2563eb;
          color: white;
        }
        
        th, td {
          padding: 12px;
          text-align: left;
          border: 1px solid #e2e8f0;
        }
        
        th {
          font-weight: bold;
          font-size: 13px;
        }
        
        td {
          font-size: 12px;
        }
        
        tbody tr:nth-child(even) {
          background-color: #f8fafc;
        }
        
        tbody tr:hover {
          background-color: #f1f5f9;
        }
        
        .metric-label {
          font-weight: bold;
        }
        
        .value-right {
          text-align: right;
        }
        
        .value-center {
          text-align: center;
        }
        
        .positive-change {
          color: #16a34a;
          font-weight: bold;
        }
        
        .negative-change {
          color: #dc2626;
          font-weight: bold;
        }
        
        .anomaly-table thead {
          background-color: #dc2626;
        }
        
        .anomaly-severity {
          font-weight: bold;
          text-transform: uppercase;
          color: #dc2626;
        }
        
        .chart-placeholder {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px;
          text-align: center;
          border-radius: 8px;
          margin: 20px 0;
          font-size: 14px;
        }
        
        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-top: 15px;
        }
        
        .category-card {
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 15px;
          background: white;
        }
        
        .category-name {
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .category-amount {
          font-size: 18px;
          color: #2563eb;
          font-weight: bold;
        }
        
        .category-percent {
          font-size: 12px;
          color: #64748b;
        }
        
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e2e8f0;
          text-align: center;
          font-size: 11px;
          color: #94a3b8;
        }
        
        .page-break {
          page-break-after: always;
        }
      </style>
    </head>
    <body>
      <!-- HEADER -->
      <div class="header">
        <div class="app-title">IncrediBills</div>
        <div class="report-title">Analytics Dashboard Report</div>
        ${userName ? `<div class="user-name">Prepared for: ${userName}</div>` : ''}
        <div class="metadata">
          Generated: ${currentDate}<br>
          Period: ${dateRange} | Categories: ${selectedCategories.join(', ')}
        </div>
      </div>

      <!-- KPI SECTION -->
      <div class="section">
        <div class="section-title">Key Performance Indicators</div>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th class="value-right">Value</th>
              <th class="value-center">Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="metric-label">Total Spending</td>
              <td class="value-right">${money(kpiData.totalSpending.current)}</td>
              <td class="value-center ${kpiData.totalSpending.change >= 0 ? 'positive-change' : 'negative-change'}">
                ${kpiData.totalSpending.change}%
              </td>
            </tr>
            <tr>
              <td class="metric-label">Avg Monthly</td>
              <td class="value-right">${money(kpiData.avgMonthly.current)}</td>
              <td class="value-center ${kpiData.avgMonthly.change >= 0 ? 'positive-change' : 'negative-change'}">
                ${kpiData.avgMonthly.change}%
              </td>
            </tr>
            <tr>
              <td class="metric-label">Total Saved</td>
              <td class="value-right">${money(kpiData.totalSaved.current)}</td>
              <td class="value-center ${kpiData.totalSaved.change >= 0 ? 'positive-change' : 'negative-change'}">
                ${kpiData.totalSaved.change}%
              </td>
            </tr>
            <tr>
              <td class="metric-label">Efficiency Score</td>
              <td class="value-right">${kpiData.efficiency.current}%</td>
              <td class="value-center ${kpiData.efficiency.change >= 0 ? 'positive-change' : 'negative-change'}">
                ${kpiData.efficiency.change}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ROLLING AVERAGES -->
      ${rollingAverages ? `
      <div class="section">
        <div class="section-title">Rolling Averages</div>
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th class="value-right">Average</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="metric-label">7-Day Average</td>
              <td class="value-right">${money(rollingAverages.sevenDay)}</td>
            </tr>
            <tr>
              <td class="metric-label">30-Day Average</td>
              <td class="value-right">${money(rollingAverages.thirtyDay)}</td>
            </tr>
            <tr>
              <td class="metric-label">90-Day Average</td>
              <td class="value-right">${money(rollingAverages.ninetyDay)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      ` : ''}

      <!-- CATEGORY BREAKDOWN -->
      <div class="section">
        <div class="section-title">Category Breakdown</div>
        <div class="category-grid">
          ${categoryBreakdown.map(cat => `
            <div class="category-card">
              <div class="category-name">${cat.category}</div>
              <div class="category-amount">${money(cat.amount)}</div>
              <div class="category-percent">${cat.percent}% of total</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="page-break"></div>

      <!-- ANOMALIES -->
      ${anomalies && anomalies.length > 0 ? `
      <div class="section">
        <div class="section-title" style="color: #dc2626;">Anomalies Detected</div>
        <table class="anomaly-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th class="value-right">Normal</th>
              <th class="value-right">Actual</th>
              <th class="value-center">Deviation</th>
              <th class="value-center">Severity</th>
            </tr>
          </thead>
          <tbody>
            ${anomalies.map(a => `
              <tr>
                <td>${a.date}</td>
                <td>${a.category}</td>
                <td class="value-right">${money(a.normal)}</td>
                <td class="value-right">${money(a.actual)}</td>
                <td class="value-center">+${a.deviation}%</td>
                <td class="value-center anomaly-severity">${a.severity.toUpperCase()}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}

      <!-- MONTHLY TRENDS -->
      <div class="section">
        <div class="section-title">Monthly Spending Trends</div>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th class="value-right">Total Spending</th>
            </tr>
          </thead>
          <tbody>
            ${timeSeriesData.slice(-12).map(d => `
              <tr>
                <td>${d.month}</td>
                <td class="value-right">${money(d.total || d.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="chart-placeholder">
          📊 Visual chart representation available in the mobile app
        </div>
      </div>

      <!-- PEAK USAGE -->
      ${peakUsageData && peakUsageData.length > 0 ? `
      <div class="section">
        <div class="section-title">Peak Usage Hours</div>
        <table>
          <thead>
            <tr>
              <th>Hour</th>
              <th class="value-right">Usage %</th>
            </tr>
          </thead>
          <tbody>
            ${peakUsageData.map(p => `
              <tr>
                <td>${p.hour}</td>
                <td class="value-right">${p.usage}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      ` : ''}

      <!-- FOOTER -->
      <div class="footer">
        Generated by IncrediBills © ${new Date().getFullYear()} | Confidential Report
      </div>
    </body>
    </html>
  `;

  try {
    // Generate PDF using expo-print
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    // Generate filename
    const fileName = userName
      ? `IncrediBills-Analytics-${userName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
      : `IncrediBills-Analytics-${new Date().toISOString().split('T')[0]}.pdf`;

    // Move to a permanent location
    const pdfUri = `${FileSystem.documentDirectory}${fileName}`;
    await FileSystem.moveAsync({
      from: uri,
      to: pdfUri,
    });

    // Share the PDF
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
  const {
    kpiData,
    categoryBreakdown,
    timeSeriesData,
  } = analyticsData;

  try {
    // Create workbook
    const wb = XLSX.utils.book_new();

    /* Report Info Sheet */
    const infoData = [
      ['Application', 'IncrediBills'],
      ['Report Type', 'Analytics Dashboard'],
      ['Generated For', userName || 'N/A'],
      ['Generated Date', new Date().toLocaleString()],
    ];
    const infoSheet = XLSX.utils.aoa_to_sheet(infoData);
    XLSX.utils.book_append_sheet(wb, infoSheet, 'Report Info');

    /* KPI Sheet */
    const kpiSheetData = [
      ['Metric', 'Value', 'Change'],
      ['Total Spending', kpiData.totalSpending.current, `${kpiData.totalSpending.change}%`],
      ['Avg Monthly', kpiData.avgMonthly.current, `${kpiData.avgMonthly.change}%`],
      ['Total Saved', kpiData.totalSaved.current, `${kpiData.totalSaved.change}%`],
      ['Efficiency Score', `${kpiData.efficiency.current}%`, `${kpiData.efficiency.change}%`],
    ];
    const kpiSheet = XLSX.utils.aoa_to_sheet(kpiSheetData);
    XLSX.utils.book_append_sheet(wb, kpiSheet, 'KPIs');

    /* Category Sheet */
    const categoryData = [
      ['Category', 'Amount', 'Percentage'],
      ...categoryBreakdown.map(c => [c.category, c.amount, `${c.percent}%`])
    ];
    const categorySheet = XLSX.utils.aoa_to_sheet(categoryData);
    XLSX.utils.book_append_sheet(wb, categorySheet, 'Categories');

    /* Monthly Trend Sheet */
    const trendData = [
      ['Month', 'Total Spending'],
      ...timeSeriesData.map(d => [d.month, d.total || d.amount])
    ];
    const trendSheet = XLSX.utils.aoa_to_sheet(trendData);
    XLSX.utils.book_append_sheet(wb, trendSheet, 'Monthly Trends');

    // Write to file
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    
    const fileName = userName
      ? `IncrediBills-Analytics-${userName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`
      : `IncrediBills-Analytics-${new Date().toISOString().split('T')[0]}.xlsx`;

    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    // Write the file
    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Share the Excel file
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