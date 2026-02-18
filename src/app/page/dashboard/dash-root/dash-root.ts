import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface StatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  icon: string;
}

interface ChartDataPoint {
  month: string;
  value: number;
}

interface LineChartData {
  label: string;
  color: string;
  data: number[];
}

interface Registration {
  name: string;
  status: string;
  regDate: string;
}

interface Transaction {
  paidBy: string;
  packageName: string;
  price: string;
  status: string;
  paidDate: string;
}

@Component({
  selector: 'app-dash-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './dash-root.html',
  styleUrl: './dash-root.css',
})
export class DashRoot {
  // Stat cards data
  statCards: StatCard[] = [
    {
      title: 'Users',
      value: '430',
      change: '32.54%',
      isPositive: true,
      period: 'Last 30 days',
      icon: 'users'
    },
    {
      title: 'Subscriptions',
      value: '360',
      change: '32.54%',
      isPositive: false,
      period: 'Last 30 days',
      icon: 'document'
    },
    {
      title: 'Generated Images',
      value: '43,583',
      change: '32.54%',
      isPositive: true,
      period: 'Last 30 days',
      icon: 'image'
    },
    {
      title: 'Generated Codes',
      value: '34,385',
      change: '32.54%',
      isPositive: true,
      period: 'Last 30 days',
      icon: 'code'
    }
  ];

  // Bar chart data
  barChartData: ChartDataPoint[] = [
    { month: 'Feb', value: 4900 },
    { month: 'Mar', value: 2600 },
    { month: 'Apr', value: 3800 },
    { month: 'May', value: 2200 },
    { month: 'Jun', value: 2900 },
    { month: 'Jul', value: 3400 }
  ];

  hoveredBarIndex: number | null = null;
  hoveredBarData: any = null;
  maxBarValue = 7000;

  // Line chart data
  lineChartData: LineChartData[] = [
    {
      label: 'February',
      color: '#F59E0B',
      data: [2000, 1500, 2500, 2200, 2800, 2400, 3000, 2600, 2900, 3200, 2800, 3400, 3100, 3600, 2200]
    },
    {
      label: 'March',
      color: '#0EA5E9',
      data: [2500, 2800, 2200, 2600, 3000, 2700, 3300, 2900, 3200, 3600, 3100, 3800, 3400, 4000, 4200]
    },
    {
      label: 'April',
      color: '#A855F7',
      data: [3000, 3200, 2800, 3100, 3500, 3200, 3800, 3400, 3700, 4100, 3600, 4300, 3900, 4500, 4700]
    },
    {
      label: 'May',
      color: '#10B981',
      data: [3500, 3800, 3200, 3600, 4000, 3700, 4300, 3900, 4200, 4600, 4100, 4800, 4400, 5000, 6800]
    }
  ];

  maxLineValue = 7000;

  // Registrations table data
  registrations: Registration[] = [
    { name: 'Stella Powell', status: 'Active', regDate: '03/27/2026' },
    { name: 'Aaron Dunn', status: 'Pending', regDate: '08/14/2026' },
    { name: 'Eleanor Kim', status: 'Active', regDate: '11/17/2026' },
    { name: 'Joshua Cook', status: 'Active', regDate: '08/09/2026' },
    { name: 'Anna Russell', status: 'Pending', regDate: '08/09/2026' }
  ];

  // Transactions table data
  transactions: Transaction[] = [
    { paidBy: 'Stella Powell', packageName: 'Starter', price: '$11.99', status: 'Expired', paidDate: '03/27/2026' },
    { paidBy: 'Aaron Dunn', packageName: 'Professional', price: '$24', status: 'Active', paidDate: '08/14/2026' },
    { paidBy: 'Eleanor Kim', packageName: 'Organization', price: '$39', status: 'Active', paidDate: '11/17/2026' },
    { paidBy: 'Joshua Cook', packageName: 'Starter', price: '$11.99', status: 'Expired', paidDate: '08/09/2026' },
    { paidBy: 'Anna Russell', packageName: 'Starter', price: '$11.99', status: 'Active', paidDate: '08/09/2026' }
  ];

  selectedBarTimeRange = '6 months';
  selectedLineTimeRange = '15 days';

  getBarHeight(value: number): number {
    return (value / this.maxBarValue) * 100;
  }

  onBarHover(index: number, data: ChartDataPoint) {
    this.hoveredBarIndex = index;
    const prevValue = index > 0 ? this.barChartData[index - 1].value : data.value;
    const change = ((data.value - prevValue) / prevValue * 100).toFixed(0);
    
    this.hoveredBarData = {
      label: `New User : ${(data.value / 1000).toFixed(0)}K`,
      change: `${Math.abs(Number(change))}%`,
      isPositive: Number(change) >= 0,
      text: 'than last month'
    };
  }

  onBarLeave() {
    this.hoveredBarIndex = null;
    this.hoveredBarData = null;
  }

  getLineChartPath(data: number[]): string {
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (value / this.maxLineValue) * 100;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    return points;
  }

  getCirclePosition(index: number, value: number, dataLength: number): { x: number, y: number } {
    const x = (index / (dataLength - 1)) * 100;
    const y = 100 - (value / this.maxLineValue) * 100;
    return { x, y };
  }
}
