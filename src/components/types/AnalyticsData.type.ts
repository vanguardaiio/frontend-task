export interface AnalyticsData {
    totalUsers: number
    totalProducts: number
    totalRevenue: number
    activeSessions: number
    revenueByMonth: Array<{
        month: string
        revenue: number
    }>
}
