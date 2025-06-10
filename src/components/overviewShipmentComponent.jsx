import NaconLogo from "../assets/Nacon.jpg";

const initialShipment = [
  {
    Message: "Success",
    Status: "Arrived",
    StatusId: 40,
    BLReferenceNo: "GGZ2544026",
    ShippingLine: "CMA CGM",
    ContainerNumber: "TCNU1230488",
    ContainerTEU: "40",
    ContainerType: "HC",
    FromCountry: "CHINA",
    Pol: "NANSHA",
    LoadingDate: { Date: "2025-05-25", IsActual: true },
    DepartureDate: { Date: "2025-05-26", IsActual: true },
    ToCountry: "NIGERIA",
    Pod: "LEKKI",
    ArrivalDate: { Date: "2025-06-29", IsActual: false },
    DischargeDate: { Date: "2025-06-29", IsActual: false },
    Vessel: "CMA CGM MAGELLAN",
    VesselIMO: "9454424",
    VesselVoyage: "0WWKXW1MA",
    EmptyToShipperDate: "2025-05-22",
    GateInDate: "2025-05-24",
    FormatedTransitTime: "35 days",
    FirstETA: "2025-06-29",
    LiveMapUrl:
      "https://shipsgo.com/live-map-container-tracking?query=TCNU1230488",
    Co2Emission: "1.91",
  },
];

export default function OverviewShipmentComponent() {
  return (
    <div className="p-6 h-full rounded-xl flex flex-col">
      <div className="static flex gap-6">
        <img src={NaconLogo} alt="" className="size-20" />
        <h2 className="text-5xl uppercase font-bold my-8 text-[var(--Secondary)]">
          Incoming Shipments View.
        </h2>
      </div>
      <div className="rounded-lg border border-[var(--Primary)] overflow-y-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[var(--Primary)] opacity-80 text-[var(--Accent)] uppercase tracking-wider text-center text-xl font-semibold h-16">
            <tr>
              <th className="px-4 py-3">Container No.</th>
              <th className="px-4 py-3">Importer</th>
              <th className="px-4 py-3">ETA</th>
              <th className="px-4 py-3">Shipping Line</th>
              <th className="px-4 py-3">Port of Discharge</th>
              <th className="px-4 py-3">Consignee Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--Primary)]">
            {initialShipment.map((shipment) => (
              <tr
                key={shipment.ContainerNumber}
                className="hover:bg-[var(--Secondary)] hover:opacity-90 hover:text-[var(--Accent)] text-center text-[var(--Primary)] text-lg font-bold delay-[.125s] duration-75"
              >
                <td className="px-4 py-3 underline">
                  <code className="bg-[var(--NavBackgroundTwo)] p-2 rounded-md">
                    {shipment.ContainerNumber}
                  </code>
                </td>
                <td className="px-4 py-3">{shipment.importer || "-"}</td>
                <td className="px-4 py-3">{shipment.FirstETA}</td>
                <td className="px-4 py-3">{shipment.ShippingLine}</td>
                <td className="px-4 py-3">{shipment.Pod}</td>
                <td className="px-4 py-3">{shipment.consignee || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
