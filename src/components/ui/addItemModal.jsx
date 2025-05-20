import { Button } from "./button";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function AddItemModal({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

// Fetch categories when the modal opens
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories") // adjust to your endpoint
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
      });
  }, []);

 // post new item 
  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        category: parseInt(category),
      };

      const response = await axios.post("http://127.0.0.1:8000/api/items", payload);
      console.log("Item added:", response.data);
      toast.success("Item added successfully", { duration: 1500 });
      onClose(); // close modal
    } catch (error) {
      toast.error("Failed to add");
      console.error("Error adding item:", error);
    }
  };



  if (!isOpen) return null;
  return (
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <div className="space-y-4">
          <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-3 px-3 py-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button className="bg-gray-700 black hover:bg-gray-800" onClick={onClose}>Cancel</Button>
          <Button className="bg-green-700 hover:bg-green-800" onClick={handleSubmit}>Add</Button>
        </div>
      </div>
    </div>
  );
}

export { AddItemModal };