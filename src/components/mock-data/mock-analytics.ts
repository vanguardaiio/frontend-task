import type { AnalyticsData } from "../types/AnalyticsData.type";

export const mockAnalytics: AnalyticsData = {
    totalUsers: Math.floor(Math.random() * 1000),
    totalProducts: Math.floor(Math.random() * 500),
    totalRevenue: Math.floor(Math.random() * 100000),
    activeSessions: Math.floor(Math.random() * 300),
    revenueByMonth: Array.from({ length: 6 }, (_, i) => ({
        month: new Date(0, i).toLocaleString('default', { month: 'short' }),
        revenue: Math.floor(Math.random() * 20000)
    }))
}