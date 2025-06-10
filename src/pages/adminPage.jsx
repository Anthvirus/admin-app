import { useState } from "react";
import ShipmentList from "../components/trackingComponent";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNewEntryOpen, setNewEntry] = useState(false);
  const [formData, setFormData] = useState({
    billLoadingNumber: "",
  });

  const [fetchedShipment, setFetchedShipment] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");

  const closeModals = () => {
    setNewEntry(false);
    setFormData({ billLoadingNumber: "" });
    setError("");
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

  const handleCreate = async () => {
    if (!formData.billLoadingNumber) {
      setError("Please enter a Bill of Lading number.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://www.shipsgo.com/api/v1.2/ContainerService/GetContainerInfo/?authCode=4c67a579b9330e566dc9aad595cc8a6a",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ billLoadingNumber: formData.billLoadingNumber }),
        }
      );

      const data = await response.json();

      if (!data || !data.ContainerList || data.ContainerList.length === 0) {
        setError("No container data found for this B/L number.");
        return;
      }

      setFetchedShipment(data);
      setShowPreview(true);
    } catch (err) {
      console.error("API error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitToDatabase = () => {
    // Add your logic here to POST fetchedShipment to your database
    console.log("Submitting to database:", fetchedShipment);

    // Reset everything
    setShowPreview(false);
    setFetchedShipment(null);
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
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4 p-2 bg-[var(--Secondary)] w-max rounded-md">
              New Shipment Entry
            </h3>

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
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm bg-gray-100 hover:opacity-80 rounded-md cursor-pointer font-semibold"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 text-sm bg-blue-800 text-white rounded-md cursor-pointer hover:opacity-80 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Entry"}
              </button>
            </div>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
                <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {showPreview && fetchedShipment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
            <h3 className="text-lg font-semibold mb-4">
              Shipment Preview
            </h3>
            <div className="max-h-96 overflow-y-auto text-sm space-y-2">
              {fetchedShipment.ContainerList.map((container, idx) => (
                <div
                  key={idx}
                  className="border rounded p-3 bg-gray-50 mb-2 shadow-sm"
                >
                  <p><strong>Container Number:</strong> {container.ContainerNumber}</p>
                  <p><strong>Status:</strong> {container.Status}</p>
                  <p><strong>Shipping Line:</strong> {container.ShippingLine}</p>
                  <p><strong>ETA:</strong> {container.FirstETA}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitToDatabase}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:opacity-80"
              >
                Submit to Database
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
