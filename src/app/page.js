import Image from "next/image";
import TransactionDashboard from "./components/TransactionDashboard";

export default function Home() {
  return (
    <div className="my-10 flex flex-col justify-center items-center">
      <h1 className=" text-2xl font-semibold text-center">Transaction Dashboard with API Integration</h1>
      <TransactionDashboard/>
    </div>
  );
}
