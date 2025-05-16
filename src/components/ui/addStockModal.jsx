import { Button } from "./button";
import { Input } from "./input";

function StockTransactionModel({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Stock Transaction</h2>
        <div className="space-y-4">
          
          <Input placeholder="Item" />
           <Input placeholder="Quantity" />
          <Input placeholder="Date Of Issue" />
           <Input placeholder="Category" />
            <Input placeholder="Section" />
             <Input placeholder="Name Of Employee" />
              <Input placeholder="Remarks" />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button  className="bg-gray-700 black hover:bg-gray-800" onClick={onClose}>Cancel</Button>
          <Button className="bg-green-700 hover:bg-green-800">Add</Button>
        </div>
      </div>
    </div>
  );
}
export {StockTransactionModel};