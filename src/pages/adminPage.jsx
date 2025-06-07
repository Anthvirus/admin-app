import ShipmentList from "../components/shipmentComponent";

export default function AdminPage() {
  return (
    <div className="max-h-full w-full bg-[var(--Secondary))] text-gray-800 pl-4 flex flex-col">
      <div className="flex justify-between mx-24 items-center">
      <h2 className="text-5xl font-extrabold py-8 text-[var(--NavBackgroundOne)] static">
        Hello, Welcome back.
        </h2>
        <button className="hover:border-2 text-2xl font-mono font-extrabold p-4 rounded-xl shadow-md bg-[var(--Accent)] text-[var(--Secondary)] cursor-pointer hover:bg-[var(--Secondary)] hover:text-[var(--Accent)]">New Entry +</button>
      </div>
      <div className="rounded-tl-xl border-2 h-full w-full static overflow-y-auto">
        <ShipmentList />
      </div>
    </div>
  );
}