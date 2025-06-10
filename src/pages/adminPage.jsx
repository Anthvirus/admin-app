import { useState } from "react";
import ShipmentList from "../components/shipmentComponent";

export default function AdminPage() {
  const [isNewEntryOpen, setNewEntry] = useState(false);
  const [formData, setFormData] = useState({
    billLoadingNumber: "",
  });

  const closeModals = () => {
    setNewEntry(false);
    setFormData({ billLoadingNumber: "" }); 
  };

  const openNewEntry = () => {
    setNewEntry(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      billLoadingNumber: e.target.value,
    });
  };

  const handleCreate = () => {
    if (!formData.billLoadingNumber.trim()) {
      alert("Please enter a Bill Loading Number");
      return;
    }

    console.log("New Entry:", formData);

    closeModals();
  };

  return (
    <div className="max-h-full w-full bg-[var(--Secondary)] text-gray-800 flex flex-col">
      <div className="flex justify-between mx-24 items-center">
        <h2 className="text-5xl font-extrabold py-8 text-[var(--NavBackgroundOne)]">
          Hello, Welcome back.
        </h2>
        <button
          onClick={openNewEntry}
          className="hover:border-2 text-lg font-extrabold p-3 rounded-xl shadow-md bg-[var(--Accent)] text-[var(--Secondary)] cursor-pointer hover:bg-[var(--Secondary)] hover:text-[var(--Accent)]"
        >
          + Create New Entry
        </button>
      </div>

      <div className="rounded-tl-xl border-2 h-full max-w-full static overflow-y-auto bg-[var(--Accent)] ml-12">
        <ShipmentList />
      </div>

      {isNewEntryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold mb-4 p-2 bg-[var(--Secondary)] w-max rounded-md">New Shipment Entry</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium capitalize mb-1">
                  Enter Bill Loading Number:
                </label>
                <input
                  type="text"
                  className="border rounded px-3 py-2"
                  value={formData.billLoadingNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm bg-gray-100 hover:opacity-80 rounded-md cursor-pointer font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 text-sm bg-blue-800 text-white rounded-md cursor-pointer hover:opacity-80 font-semibold"
              >
                Create Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
