import { KPIData } from "@/types/general";

export const departments = [
    { name: 'Choir', members: 15, kpi: 20, trend: 'up' },
    { name: 'Evangelism', members: 10, kpi: 10, trend: 'down' },
    { name: 'Drama', members: 12, kpi: 25, trend: 'up' },
    { name: 'Children', members: 10, kpi: 1, trend: 'down' },
    { name: 'Teens', members: 7, kpi: 15, trend: 'up' },
    { name: 'Ushering', members: 12, kpi: 50, trend: 'up' },
    { name: 'Media', members: 5, kpi: 15, trend: 'down' }
  ];

  export const departmentKPI: KPIData = {
    finance: 40,
    people: 20,
    operation: 25,
    improvement: 15,
    location: '',
  };