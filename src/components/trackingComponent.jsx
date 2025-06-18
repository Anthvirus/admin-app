import { useEffect, useState, useRef } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";

const API_BASE = "https://nacon-3v1d.onrender.com/api/shipments";

export default function ShipmentList() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [shipments, setShipments] = useState([]);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editFields, setEditFields] = useState({});
  const inputRefs = useRef({});

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_BASE);
      setShipments(res.data);
    } catch (err) {
      console.error("Error fetching shipments:", err);
    }
    setLoading(false);
  };

  const handleEditClick = (shipment) => {
    setEditData({ ...shipment });
    setEditFields({
      billLandingNo: shipment.billLandingNo || "",
      containerNo: shipment.containerNo?.[0] || "",
      importer: shipment.importer || "",
      shippingLine: shipment.shippingLine || "",
      examinationAndCustomReleasing:
        shipment.examinationAndCustomReleasing || "",
      consigneeName: shipment.consigneeName || "",
      customDocumentation: shipment.customDocumentation || "",
      portOfDischarge: shipment.portOfDischarge || "",
      shippingReleasing: shipment.shippingReleasing || "",
      delivery: shipment.delivery || "",
    });
    setShowEditModal(true);
  };

  const handleSave = async () => {
    const requiredFields = [
      "containerNo",
      "importer",
      "shippingLine",
      "examinationAndCustomReleasing",
      "consigneeName",
      "customDocumentation",
      "portOfDischarge",
      "shippingReleasing",
    ];

    const newData = { ...editData };
    const errors = {};

    requiredFields.forEach((field) => {
      const value = inputRefs.current[field]?.value?.trim();
      if (!value) {
        errors[field] = "This field is required.";
      } else {
        newData[field] = field === "containerNo" ? [value] : value;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setLoading(true);

    try {
      const res = await axios.put(
        `${API_BASE}/${editData.id}`,
        newData
      );
      setMessage("✅ Shipment updated successfully.");
      window.location.reload();
    } catch (err) {
      console.error("Error updating shipment:", err);
      setMessage("❌ Failed to update shipment.");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteData || !deleteData.billLandingNo) return;

    setLoading(true);
    try {
      await axios.delete(`${API_BASE}/${deleteData.id}`);
      setMessage("🗑️ Shipment deleted.");
      setShipments((prev) =>
        prev.filter((s) => s.billLandingNo !== deleteData.billLandingNo)
      );
      setDeleteData(null);
    } catch (err) {
      console.error("Error deleting shipment:", err);
      setMessage("❌ Failed to delete shipment.");
    }
    setLoading(false);
    window.location.reload();
  };

  const InfoRow = ({ label, value, style }) => (
    <div className="flex flex-col p-2">
      <span className="text-xs">{label}:</span>
      <span className="font-semibold text-lg" style={style}>
        {value || "—"}
      </span>
    </div>
  );

  const Modal = ({ title, children, visible }) => (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } bg-black bg-opacity-40`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded shadow-lg text-lg font-medium">
            Loading, please wait...
          </div>
        </div>
      )}

      {message && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded shadow">
          {message}
          <button onClick={() => setMessage("")} className="ml-4 font-bold">
            ×
          </button>
        </div>
      )}

      <div className="gap-2 flex flex-col p-2">
        {shipments.map((shipment, idx) => (
          <div
            key={`${shipment.billLandingNo}-${idx}`}
            className="bg-[var(--Secondary)] text-[var(--Accent)] shadow-md rounded-lg p-4 flex-1 min-w-[20rem]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold p-1 bg-gray-300 rounded-md">
                {shipment.billLandingNo} – {shipment.containerNo}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(shipment)}
                  className="hover:scale-110 text-shadow-blue-500 cursor-pointer"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => setDeleteData(shipment)}
                  className="text-red-700 hover:scale-110 cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="flex justify-around">
              <InfoRow label="Importer" value={shipment.importer} />
              <InfoRow
                label="Shipping Line"
                value={shipment.shippingLine.replace(/_/g, " ")}
              />
              <InfoRow label="Vessel" value={shipment.vessel} />
              <InfoRow
                label="Status"
                value={shipment.status}
                style={{
                  color: shipment.status !== "Arrived" ? "Purple" : "Green",
                }}
              />
              <InfoRow label="ETA" value={shipment.eta} />
              <InfoRow label="Consignee Name" value={shipment.consigneeName} />
              <InfoRow
                label="Port of Discharge"
                value={shipment.portOfDischarge}
                style={{ color: "Blue" }}
              />
              <InfoRow
                label="Shipping Releasing"
                value={shipment.shippingReleasing}
              />
              <InfoRow
                label="Custom Documentation"
                value={shipment.customDocumentation}
              />
              <InfoRow
                label="Exam & Custom Releasing"
                value={shipment.examinationAndCustomReleasing}
              />
              <InfoRow label="Delivery" value={shipment.delivery} />
            </div>
          </div>
        ))}
      </div>

      {deleteData && (
        <Modal title="Confirm Deletion">
          <p>
            Are you sure you want to delete shipment{" "}
            <strong>{deleteData.billLandingNo}</strong>?
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setDeleteData(null)}
              className="px-4 py-2 bg-gray-300 rounded-md hover:opacity-80 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-700 text-white rounded-md hover:opacity-80 cursor-pointer"
            >
              {loading ? "Deleting" : "Delete Shipment"}
            </button>
          </div>
        </Modal>
      )}

      <Modal
        title={`Edit Shipment - ${editData?.billLandingNo ?? ""}`}
        visible={showEditModal}
      >
        {editData && (
          <>
            {message && (
              <div
                className={`text-sm mb-4 px-4 py-2 rounded-md ${
                  message.startsWith("✅")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </div>
            )}
            <div className="grid grid-cols-3 gap-5 w-max">
              {[
                "containerNo",
                "importer",
                "shippingLine",
                "examinationAndCustomReleasing",
                "consigneeName",
                "customDocumentation",
                "portOfDischarge",
                "shippingReleasing",
                "delivery",
              ].map((field) => (
                <div className="flex flex-col mb-3" key={field}>
                  <label className="capitalize text-sm font-medium">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    className={`border rounded px-2 py-1 ${
                      formErrors[field] ? "border-red-500" : ""
                    }`}
                    defaultValue={
                      field === "containerNo"
                        ? Array.isArray(editData?.containerNo)
                          ? editData.containerNo[0] ?? ""
                          : ""
                        : editData?.[field] ?? ""
                    }
                    ref={(el) => {
                      if (el) inputRefs.current[field] = el;
                    }}
                  />
                  {formErrors[field] && (
                    <span className="text-xs text-red-500">
                      {formErrors[field]}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => {
                  setEditData(null);
                  setShowEditModal(false);
                  setMessage("");
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:opacity-80 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-4 py-2 text-white rounded-md hover:opacity-80 cursor-pointer ${
                  loading ? "bg-gray-400" : "bg-green-600"
                }`}
              >
                {loading ? "Updating..." : "Update Shipment"}
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
