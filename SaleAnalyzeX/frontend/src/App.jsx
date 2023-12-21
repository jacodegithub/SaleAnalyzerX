import CombinedDashboard from "./combinedData";
import Footer from "./footer";
import Navbar from "./navbar";
import TransactionStatistics from "./statistics";
import TransactionsDashboard from "./transactions";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar />
      <CombinedDashboard />
      <Footer />
      {/* <TransactionStatistics /> */}
    </div>
  )
}