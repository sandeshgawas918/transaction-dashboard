import Image from "next/image";
import TransactionDashboard from "./components/TransactionDashboard";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans mt-10 mb-20 dark:bg-black">
      <h1 className=" text-2xl font-semibold">Transaction Dashboard with API Integration</h1>
      <TransactionDashboard/>
    </div>
  );
}
