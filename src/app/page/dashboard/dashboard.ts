import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';


interface ChartDataPoint {
  month: string;
  value: number;
}

interface LineChartData {
  label: string;
  color: string;
  data: number[];
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  isDarkMode = false;
  selectedTimeRange = '6 months';
  hoveredBarIndex: number | null = null;
  hoveredBarData: any = null;

  // Stats data
  stats = {
    users: {
      count: 430,
      period: 'Last 30 days',
      change: 32.54,
      isPositive: true
    },
    subscriptions: {
      count: 360,
      period: 'Last 30 days',
      change: 32.54,
      isPositive: false
    },
    generatedImages: {
      count: 43583,
      period: 'Last 30 days',
      change: 0,
      isPositive: true
    }
  };

  // Bar chart data
  barChartData: ChartDataPoint[] = [
    { month: 'Feb', value: 2800 },
    { month: 'Mar', value: 4900 },
    { month: 'Apr', value: 2600 },
    { month: 'May', value: 3800 },
    { month: 'Jun', value: 1800 },
    { month: 'Jul', value: 3200 }
  ];

  // Line chart data
  lineChartData: LineChartData[] = [
    {
      label: 'February',
      color: '#FF9F43',
      data: [2000, 2200, 2100, 2400, 2500]
    },
    {
      label: 'March',
      color: '#FFC107',
      data: [2300, 2500, 2700, 2600, 2900]
    },
    {
      label: 'April',
      color: '#00BCD4',
      data: [3000, 3200, 3100, 3300, 3500]
    },
    {
      label: 'May',
      color: '#2196F3',
      data: [3500, 3800, 3700, 4000, 4200]
    },
    {
      label: 'June',
      color: '#8B5CF6',
      data: [4500, 4800, 4600, 5000, 6500]
    }
  ];

  maxBarValue = 7000;
  maxLineValue = 7000;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  getBarHeight(value: number): number {
    return (value / this.maxBarValue) * 100;
  }

  getLineChartPoint(index: number, value: number): string {
    const x = (index / 4) * 100;
    const y = 100 - (value / this.maxLineValue) * 100;
    return `${x},${y}`;
  }

  getLineChartPath(data: number[]): string {
    return data.map((value, index) => {
      const x = (index / 4) * 100;
      const y = 100 - (value / this.maxLineValue) * 100;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }

  onBarHover(index: number, data: ChartDataPoint) {
    this.hoveredBarIndex = index;
    const maxValue = Math.max(...this.barChartData.map(d => d.value));
    const prevValue = index > 0 ? this.barChartData[index - 1].value : data.value;
    const change = ((data.value - prevValue) / prevValue * 100).toFixed(0);
    
    this.hoveredBarData = {
      label: `New User : ${data.value / 1000}K`,
      change: `${Math.abs(Number(change))}%`,
      isPositive: data.value >= prevValue,
      text: 'than last month'
    };
  }

  onBarLeave() {
    this.hoveredBarIndex = null;
    this.hoveredBarData = null;
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }
}
