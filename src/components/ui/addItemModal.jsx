import { Button } from "./button";
import { Input } from "./input";

function AddItemModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <div className="space-y-4">
          <Input placeholder="Item Name" />
          <Input placeholder="Category" />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button  className="bg-gray-700 black hover:bg-gray-800" onClick={onClose}>Cancel</Button>
          <Button className="bg-green-700 hover:bg-green-800">Add</Button>
        </div>
      </div>
    </div>
  );
}

export {AddItemModal};