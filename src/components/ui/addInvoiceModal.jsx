import { Button } from "./button";
import { Input } from "./input";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function AddInvoiceTransactionModel({ isOpen, onClose }) {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [DoE, setDoE] = useState("");
  const [receiver, setReciever] = useState("");
  const [remarks, setRemarks] = useState("");

 const handleItemChange = (e) => {
    const itemId = parseInt(e.target.value);
    setSelectedItemId(itemId);

    const selected = items.find(item => item.id === itemId);
    if (selected) {
      setSelectedCategoryName(selected.category_name);
      setSelectedCategoryId(selected.category); // For payload
    } else {
      setSelectedCategoryName("");
      setSelectedCategoryId(null);
    }
  };

    
  // fetch items when the modal opens
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/items") // adjust to your endpoint
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.error("Failed to load items", err);
      });
  }, []);

  // format date to DD/MM/YYYY
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };


  // post new invoice transaction
  const handleSubmit = async () => {
    if ( !selectedItemId || !quantity || !receiver || !remarks) {
      toast.error("Please fill all fields");
      return;
    }
    if (isNaN(quantity) || quantity <= 0) {
      toast.error("Quantity must be a positive number");
      return;
    }

    try {
      const payload = {
        item: selectedItemId,
        quantity: parseInt(quantity),
        date_of_entry: formatDate(DoE),
        reciever: receiver,
        remarks: remarks,
        category: selectedCategoryId,
      };
        console.log("Payload:", payload);
      const response = await axios.post("http://127.0.0.1:8000/api/stocks", payload);
      console.log("Invoice added:", response.data);
      toast.success("Invoice added successfully", { duration: 1500 });
      onClose(); // close modal
    } catch (error) {
      toast.error("Failed to add invoice");
      console.error("Error adding invoice:", error);
    }
  };

  if (!isOpen) return null;

  
  return (

    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Invoice Transaction</h2>
        <div className="space-y-4">
          <select value={selectedItemId || ""} onChange={handleItemChange}
            className="w-full mb-0 px-2 py-2.5 border rounded"
          >
            <option value="">Select Item</option>
            {items.map((it) => (
              <option key={it.id} value={it.id}>
                {it.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded"
          />
          <div className="flex gap-3 items-center">
            <div className="w-full text-gray-400 border rounded p-2">Date of entry</div>
            <Input value={DoE}
              onChange={(e) => setDoE(e.target.value)} type="date" className="w-40 flex-2" />
          </div>
          <input
           className="w-full mb-0 px-2 py-2 border rounded"
            type="text"
            value={selectedCategoryName || ""} readOnly

            placeholder="Category"
          />
          <Input value={receiver} onChange={(e) => setReciever(e.target.value)} placeholder="Reciever" />
          <Input value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Remarks" />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button className="bg-gray-700 black hover:bg-gray-800" onClick={onClose}>Cancel</Button>
          <Button className="bg-green-700 hover:bg-green-800" onClick={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
}
export { AddInvoiceTransactionModel };