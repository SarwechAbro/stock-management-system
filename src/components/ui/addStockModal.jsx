import { Button } from "./button";
import { Input } from "./input";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function StockTransactionModel({ isOpen, onClose }) {
    const [items, setItems] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState("");
    const [selectedCategoryName, setSelectedCategoryName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [DoI, setDoI] = useState("");
    const [emp_name, setEmp_name] = useState("");
    const [remarks, setRemarks] = useState("");
    const [section, setSection] = useState("");
  
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

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/sections") // adjust to your endpoint
      .then((res) => {
        setSections(res.data);
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
    if ( !selectedItemId || !quantity || !emp_name || !remarks) {
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
        date_of_issue: formatDate(DoI),
        emp_name: emp_name,
        section: section,
        remarks: remarks,
        category: selectedCategoryId,
      };
        console.log("Payload:", payload);
      const response = await axios.post("http://127.0.0.1:8000/api/stockout", payload);
      console.log("Stock Transaction added:", response.data);
      toast.success("Stock Transaction added successfully", { duration: 1500 });
      onClose(); // close modal
    } catch (error) {
      toast.error("Failed to add stock transaction");
      console.error("Error adding stock transaction:", error);
    }
  };


  if (!isOpen) return null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Stock Transaction</h2>
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
         <div className="w-full text-gray-400 border rounded p-2">Date of issue</div>
         <Input value={DoI}
              onChange={(e) => setDoI(e.target.value)} type="date" className="w-40 flex-2" />
         </div>
           <Input  value={selectedCategoryName || ""} readOnly placeholder="Category" />

        <select className="p-2.5 border rounded w-full" value={section} onChange={(e) => setSection(e.target.value)}>
           <option value="">Chose Section</option>
        {sections.map(section => (
          <option key={section.id} value={section.id}>
            {section.name} </option>))}
        </select>
           
             <Input placeholder="Name Of Employee" value={emp_name}
            onChange={(e) => setEmp_name(e.target.value)} />
             
              <Input placeholder="Remarks" value={remarks}
            onChange={(e) => setRemarks(e.target.value)} />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button  className="bg-gray-700 black hover:bg-gray-800" onClick={onClose}>Cancel</Button>
          <Button className="bg-green-700 hover:bg-green-800" onClick={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
}
export {StockTransactionModel};