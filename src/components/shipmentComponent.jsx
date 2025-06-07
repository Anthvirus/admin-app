import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const initialShipments = [
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
  },
];

export default function ShipmentComponent(){
  const [shipments, setShipments] = useState(initialShipments);
  const [selected, setSelected] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [formData, setFormData] = useState(null);

const openEdit = (shipment) => {
  setSelected(shipment);
  setFormData({ ...shipment }); // Create a copy for editing
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
    setShipments(shipments.filter((s) => s.id !== selected.id));
    closeModals();
  };

  return (
    <div>
      <div className="rounded-lg">
        <div>
          <table className="min-w-full rounded-tl-lg">
            <thead className="bg-[var(--Primary)] text-[var(--Accent)] text-3xl uppercase h-20 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3">Arrival</th>
                <th className="px-4 py-3">Departure</th>
                <th className="px-4 py-3">BLD Number</th>
                <th className="px-4 py-3">Containers</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 overflow-y-auto">
              {shipments.map((s, index) => (
                <tr key={index} className="bg-[var(--Accent)] text-[var(--Secondary)] text-bold h-16 hover:opacity-80 divide-x-2 text-center text-xl">
                  <td className="px-4 py-2">{s.arrivalDate}</td>
                  <td className="px-4 py-2">{s.departureDate}</td>
                  <td className="px-4 py-2 text-green-600 font-mono">
                    {s.bldNumber}
                  </td>
                  <td className="px-4 py-2">{s.containers}</td>
                  <td className="px-4 py-2">{s.source}</td>
                  <td className="px-4 py-2">{s.destination}</td>
                  <td className="px-4 py-2 flex justify-center items-center space-x-4 bg-gray-300 min-h-16">
                    <button
                      onClick={() => openEdit(s)}
                      className="text-blue-500 hover:scale-110 cursor-pointer my-auto"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => openDelete(s)}
                      className="text-red-900 hover:scale-110 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditOpen && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Edit Shipment - {selected.bldNumber}
            </h3>
            <p className="text-sm text-gray-600">
              This is where you'd show a form to edit this shipment.
            </p>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save (Simulated)
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditOpen && formData && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Edit Shipment - {formData.bldNumber}</h3>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium">Arrival Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={formData.arrivalDate}
            onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Departure Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={formData.departureDate}
            onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">BLD Number</label>
          <input
            type="text"
            className="border rounded px-3 py-2"
            value={formData.bldNumber}
            onChange={(e) => setFormData({ ...formData, bldNumber: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Number of Containers</label>
          <input
            type="number"
            className="border rounded px-3 py-2"
            value={formData.containers}
            onChange={(e) => setFormData({ ...formData, containers: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Source</label>
          <input
            type="text"
            className="border rounded px-3 py-2"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium">Destination</label>
          <input
            type="text"
            className="border rounded px-3 py-2"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={closeModals} type="button" className="px-4 py-2 text-sm bg-gray-100 cursor-pointer hover:bg-gray-200 rounded">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setShipments((prev) =>
                prev.map((s) => (s.id === formData.id ? formData : s))
              );
              closeModals();
            }}
            className="px-4 py-2 text-md hover:opacity-90 text-white rounded bg-[var(--Accent)] cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}


      {/* Delete Dialog */}
      {isDeleteOpen && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Delete Shipment
            </h3>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete{" "}
              <strong>{selected.bldNumber}</strong>?
            </p>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};