import TrackingCard from "./trackingComponent";

export default function ShipmentComponent() {
  return (
      <div className="rounded-lg max-w-full">
        <TrackingCard
          data={{
            billLoadingNumber: "BL12345678",
            containerNo: "CNU1234567",
            importer: "Green Logistics Ltd.",
            shippingLine: "Maersk",
            status: "In Transit",
            eta: "2025-06-20",
            shippingReleasing: "Done",
            customDocumentation: "Submitted",
            examination: "Pending",
            customReleasing: "Not Started",
            delivery: "Not Scheduled",
          }}
        />
      </div>
  );
}
