import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useGetSystemHealthQuery } from "@/redux/api/systemHealth"
import { formatDuration, mbParser, percentageParser } from "@/utils/dataParser"
import { Activity, Database, Server, AlertTriangle } from "lucide-react"
import { useEffect } from "react"

export default function ServerMonitor() {
  // In a real-world scenario, you'd fetch this data from your backend
  const {data,error,refetch}= useGetSystemHealthQuery()
  useEffect(() => {
    // Set up interval to refetch data every 10 seconds
    // const intervalId = setInterval(() => {
    //   refetch();
    // }, 10); // 10000 milliseconds = 10 seconds

    // // Cleanup interval on component unmount
    // return () => clearInterval(intervalId);
  }, [refetch]);
  console.log(data,error)
  const cpuUsage = percentageParser(data?.serverHealth?.cpuUsage)

  
  
  const metrics = {
    serverHealth: {
      cpuUsage: 65,
      memoryUsage: 70,
      diskSpace: 55,
      uptime: "5d 12h 30m"
    },
    apiPerformance: {
      latency: "120ms",
      responseTime: "200ms",
      errorRate: "0.5%"
    },
    databaseHealth: {
      queryPerformance: "85%",
      uptime: "30d 0h 0m",
      connectionIssues: "None"
    },
    errorLogs: {
      unhandledExceptions: 2,
      serverErrors: 5
    }
  }
  return (
    <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Server Health</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-bold">{cpuUsage}</span>
              </div>
              <Progress value={cpuUsage} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-bold">{Math.ceil(mbParser(data?.serverHealth.memoryUsage)/mbParser(data?.serverHealth.totalMemory)*100)}%</span>
              </div>
              <Progress value={Math.ceil(mbParser(data?.serverHealth.memoryUsage)/mbParser(data?.serverHealth.totalMemory)*100)} className="h-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm">Disk Space</span>
                <span className="text-sm font-bold">{metrics.serverHealth.diskSpace}%</span>
              </div>
              <Progress value={metrics.serverHealth.diskSpace} className="h-2" />
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm">Uptime</span>
                <span className="text-sm font-bold">
                  {formatDuration(data?.serverHealth.uptime)}
                  {/* {data?.serverHealth.uptime} */}
                  </span>
              </div>
            </div>
          </CardContent>
        </Card>
  )

  return (
    <div className="p-4 space-y-4">
      {/* <h1 className="text-2xl font-bold mb-4">Server Monitor</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        

        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Performance</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Latency</span>
                <span className="text-sm font-bold">{metrics.apiPerformance.latency}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Time</span>
                <span className="text-sm font-bold">{metrics.apiPerformance.responseTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Error Rate</span>
                <span className="text-sm font-bold">{metrics.apiPerformance.errorRate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Health</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Query Performance</span>
                <span className="text-sm font-bold">{metrics.databaseHealth.queryPerformance}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime</span>
                <span className="text-sm font-bold">{metrics.databaseHealth.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Connection Issues</span>
                <span className="text-sm font-bold">{metrics.databaseHealth.connectionIssues}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Logs</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Unhandled Exceptions</span>
                <span className="text-sm font-bold">{metrics.errorLogs.unhandledExceptions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">500 Errors</span>
                <span className="text-sm font-bold">{metrics.errorLogs.serverErrors}</span>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}