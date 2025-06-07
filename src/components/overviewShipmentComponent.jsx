import NaconLogo from "../assets/Nacon.jpg";

const shipments = [
  {
    id: 1,
    arrivalDate: "2025-06-05",
    departureDate: "2025-06-01",
    bldNumber: "BLD123456",
    containers: 12,
    destination: "Lagos",
    source: "Rotterdam",
  },
  {
    id: 2,
    arrivalDate: "2025-06-10",
    departureDate: "2025-06-06",
    bldNumber: "BLD789012",
    containers: 8,
    destination: "Port Harcourt",
    source: "Hamburg",
  },
  {
    id: 1,
    arrivalDate: "2025-06-05",
    departureDate: "2025-06-01",
    bldNumber: "BLD123456",
    containers: 12,
    destination: "Lagos",
    source: "Rotterdam",
  },
  {
    id: 2,
    arrivalDate: "2025-06-10",
    departureDate: "2025-06-06",
    bldNumber: "BLD789012",
    containers: 8,
    destination: "Port Harcourt",
    source: "Hamburg",
  },{
    id: 1,
    arrivalDate: "2025-06-05",
    departureDate: "2025-06-01",
    bldNumber: "BLD123456",
    containers: 12,
    destination: "Lagos",
    source: "Rotterdam",
  },
  {
    id: 2,
    arrivalDate: "2025-06-10",
    departureDate: "2025-06-06",
    bldNumber: "BLD789012",
    containers: 8,
    destination: "Port Harcourt",
    source: "Hamburg",
  },{
    id: 1,
    arrivalDate: "2025-06-05",
    departureDate: "2025-06-01",
    bldNumber: "BLD123456",
    containers: 12,
    destination: "Lagos",
    source: "Rotterdam",
  },
  {
    id: 2,
    arrivalDate: "2025-06-10",
    departureDate: "2025-06-06",
    bldNumber: "BLD789012",
    containers: 8,
    destination: "Port Harcourt",
    source: "Hamburg",
  },{
    id: 1,
    arrivalDate: "2025-06-05",
    departureDate: "2025-06-01",
    bldNumber: "BLD123456",
    containers: 12,
    destination: "Lagos",
    source: "Naples",
  },
  {
    id: 2,
    arrivalDate: "2025-06-10",
    departureDate: "2025-06-06",
    bldNumber: "BLD789012",
    containers: 8,
    destination: "Liverpool",
    source: "Jakarta",
  },{
    id: 1,
    arrivalDate: "2025-06-05",
    departureDate: "2025-06-01",
    bldNumber: "BLD123456",
    containers: 12,
    destination: "Shanghai",
    source: "Hamburg",
  },
  {
    id: 2,
    arrivalDate: "2025-06-10",
    departureDate: "2025-06-06",
    bldNumber: "BLD789012",
    containers: 8,
    destination: "Port Harcourt",
    source: "Hamburg",
  },{
    id: 1,
    arrivalDate: "2025-06-05",
    departureDate: "2025-06-01",
    bldNumber: "BLD123456",
    containers: 1,
    destination: "Lagos",
    source: "Rotterdam",
  }
];

export default function OverviewShipmentComponent() {
  return (
    <div className="p-6 border-2 border-[var(--Secondary)] max-h-full rounded-xl flex flex-col">
      <div className="static flex gap-6">
        <img src={NaconLogo} alt="" className="size-20"/>
        <h2 className="text-5xl uppercase font-bold my-8 text-[var(--Secondary)]">
          Incoming Shipments.
        </h2>
      </div>
      <div className="rounded-lg border border-[var(--Primary)] overflow-y-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[var(--Secondary)] text-[var(--Accent)] uppercase tracking-wider text-center text-2xl font-semibold h-24">
            <tr>
              <th className="px-4 py-3">BLD Number</th>
              <th className="px-4 py-3">Arrival Date</th>
              <th className="px-4 py-3">Departure Date</th>
              <th className="px-4 py-3">Containers</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Destination</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--Primary)]">
            {shipments.map((shipment) => (
              <tr key={shipment.id} className="hover:bg-[var(--Secondary)] hover:text-[var(--Accent)] text-center text-[var(--Primary)] text-2xl delay-[.125s] duration-75">
                <td className="px-4 py-3 font-mono underline">
                  <code className="bg-[var(--NavBackgroundTwo)] p-1 rounded-md">{shipment.bldNumber}</code>
                </td>
                <td className="px-4 py-3">{shipment.arrivalDate}</td>
                <td className="px-4 py-3">{shipment.departureDate}</td>
                <td className="px-4 py-3">{shipment.containers}</td>
                <td className="px-4 py-3">{shipment.source}</td>
                <td className="px-4 py-3">{shipment.destination}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
