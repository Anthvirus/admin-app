import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function ShipmentList() {
  const [shipments, setShipments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const initialShipment = [
    {
      Message: "Success",
      Status: "Arrived",
      StatusId: 40,
      BLReferenceNo: "GGZ2544026",
      ShippingLine: ["CMA CGM","Ocean Network Express"],
      ContainerNumber: ["TCNU1230488", "TCNU4238491"],
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

  useEffect(() => {
    setShipments(initialShipment);
  }, []);

  const openEdit = (shipment) => {
    setSelected(shipment);
    setFormData({ ...shipment });
    setEditOpen(true);
  };

  const openDelete = (shipment) => {
    setSelected(shipment);
    setDeleteOpen(true);
  };

  const closeModals = () => {
    setSelected(null);
    setEditOpen(false);
    setDeleteOpen(false);
  };

  const handleDelete = () => {
    setShipments((prev) =>
      prev.filter((s) => s.BLReferenceNo !== selected.BLReferenceNo)
    );
    closeModals();
  };

  const handleSave = () => {
    setShipments((prev) =>
      prev.map((s) =>
        s.BLReferenceNo === formData.BLReferenceNo ? formData : s
      )
    );
    closeModals();
  };

function renderContainerCards() {
  return shipments.flatMap((shipment) => {
    const containers = Array.isArray(shipment.ContainerNumber)
      ? shipment.ContainerNumber
      : [shipment.ContainerNumber];

    const shippingLines = Array.isArray(shipment.ShippingLine)
      ? shipment.ShippingLine
      : [shipment.ShippingLine];

    return containers.map((container, i) => (
      <div
        key={`${shipment.BLReferenceNo}-${container}`}
        className="bg-[var(--Secondary)] text-[var(--Accent)] shadow-md rounded-lg p-4 m-3"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold p-1 bg-gray-300 rounded-md font-mono">
            {shipment.BLReferenceNo} - {container}
          </h2>
          <p className="text-lg text-blue-600 font-bold m-4">
            <strong>From:</strong> {shipment.Pol}, {shipment.FromCountry} →{" "}
            <strong>To:</strong> {shipment.Pod}, {shipment.ToCountry}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => openEdit(shipment)}
              className="text-yellow-600 hover:scale-110 cursor-pointer"
            >
              <Pencil size={20} />
            </button>
            <button
              onClick={() => openDelete(shipment)}
              className="text-red-600 hover:scale-110 cursor-pointer"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
        <div className="flex mt-3 justify-between p-1 gap-2">
          <InfoRow
            label="Status"
            value={shipment.Status}
            style={
              shipment.Status === "Sailing"
                ? { color: "orange" }
                : { color: "green" }
            }
          />
          <InfoRow label="Importer" value="-" />
          <InfoRow label="ETA" value={shipment.FirstETA} />
          <InfoRow label="Shipping Releasing" value="-" />
          <InfoRow
            label="Shipping Line"
            value={shippingLines[i] || shippingLines[0]}
          />
          <InfoRow label="Custom Documentation" value="-" />
          <InfoRow label="Exam. & Custom Releasing" value="-" />
          <InfoRow label="Delivery" value="-" />
        </div>
      </div>
    ));
  });
}


  return (
    <>
      <div className="flex flex-col">{renderContainerCards()}</div>

      {isEditOpen && formData && (
        <Modal title={`Edit Shipment - ${formData.BLReferenceNo} : ${formData.ContainerNumber}`}>
          {["Importer", "ShippingReleasing", "Custom Documentation", "ExamAndCustomReleasing", "Delivery"].map(
            (field) => (
              <div key={field} className="flex flex-col mb-4">
                <label className="text-sm font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  className="border rounded px-3 py-2"
                  value={formData[field] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              </div>
            )
          )}
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={closeModals} className="bg-gray-200 p-2 rounded-md cursor-pointer hover:opacity-80 font-semibold">
              Cancel
            </button>
            <button onClick={handleSave} className="bg-green-600 font-semibold text-white cursor-pointer hover:opacity-80 px-4 py-2 rounded-md">
              Save
            </button>
          </div>
        </Modal>
      )}

      {isDeleteOpen && selected && (
        <Modal title={`Delete Shipment - ${selected.BLReferenceNo}`}>
          <p>
            Are you sure you want to delete entry for this shipment{" "}
            <strong>{selected.BLReferenceNo} : {selected.ContainerNumber} </strong>?
          </p>
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={closeModals} className="p-2 bg-gray-200 cursor-pointer hover:opacity-80 rounded-md">
              Cancel
            </button>
            <button onClick={handleDelete} className="py-2 px-4 bg-red-500 text-white rounded-md cursor-pointer hover:opacity-80">
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

function InfoRow({ label, value, style }) {
  return (
    <div className="flex flex-col w-full">
      <span className="text-sm">{label}:</span>
      <span className="text-xl font-bold"  style ={style} >{value || "—"}</span>
    </div>
  );
}

function Modal({ children, title }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h3 className="text-lg font-semibold mb-4 p-2 bg-[var(--Secondary)] w-max rounded-md">{title}</h3>
        {children}
      </div>
    </div>
  );
}
