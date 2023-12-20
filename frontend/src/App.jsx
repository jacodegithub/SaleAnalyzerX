import CombinedDashboard from "./combinedData";
import TransactionStatistics from "./statistics";
import TransactionsDashboard from "./transactions";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-800">
      <CombinedDashboard />
      {/* <TransactionStatistics /> */}
    </div>
  )
}