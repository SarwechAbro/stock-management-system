import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef} from "react";
import {AddItemModal} from "../ui/addItemModal";
import {UpdateItemModal} from "../ui/updateItemModal";




const inventoryData = [
  { name: "Desk Lamp",  quantity: 56, category: "Lighting" },
  { name: "Desk Organizer", sku: "ORG-007", price: "$24.99", quantity: 68, category: "Office Accessories" },
  { name: "Ergonomic Desk Chair", sku: "CHAIR-001", price: "$249.99", quantity: 45, category: "Office Furniture" },
  { name: "Monitor Stand", sku: "STAND-003", price: "$59.99", quantity: 32, category: "Office Accessories" },
  { name: "Notebook Bundle", sku: "NB-006", price: "$19.99", quantity: 120, category: "Stationery" },
];

export function PageHeader( { onAddClick }) {
  return (
    <div className="flex justify-between items-center pb-4 ">
      <div>
        <h1 className="text-3xl font-bold text-gray-600">Item Management</h1>
        <p className="text-gray-500 text-sm">Manage your inventory items</p>
      </div>
      <Button className="bg-green-700 hover:bg-green-800" onClick={onAddClick}>+ Add Item</Button>
    </div>
  );
}

export function InventoryHeader() {
  return (
    <>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
         Inventory Items
      </h2>
      <p className="text-sm text-gray-500 mb-4">A list of all inventory items with details</p>
    </>
  );
}

export function InventorySearch() {
  return <Input placeholder="Search items by ID, name, or category..." className="mb-4" />;
}


export function InventoryTableBody({ onUpdateClick }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuRef = useRef(null);
   
  useEffect(() => {
    function handleClickOutside(event) {
      // If click is outside the menu container, close menu
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (idx) => {
    setOpenMenuIndex(openMenuIndex === idx ? null : idx);
  };

  return (
    <tbody ref={menuRef}>
      {inventoryData.map((item, idx) => (
        <tr key={idx} className="border-b hover:bg-gray-50">
          <td className="p-3">{idx + 1}</td>
          <td className="p-3 ">{item.name}</td>
          <td className="p-3">{item.category}</td>
           <td className="pl-9 text-green-600">8</td>
          <td className="pl-7 text-eight">
            <div className="relative inline-block text-left">
              <MoreVertical
                className="h-5 w-5 text-gray-600 cursor-pointer transition-all duration-300"
                onClick={() => toggleMenu(idx)}
              />
              {openMenuIndex === idx && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                  <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={onUpdateClick}>Update</button>
                  <button className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
                </div>
              )}
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default function InventoryPage() {
  const [modalType, setModalType] = useState(null);
  const closeModal = () => setModalType(null);
  return (
    <div className="p-6">
     <PageHeader onAddClick={() => setModalType("add")} />
     <AddItemModal isOpen={modalType === "add"} onClose={closeModal} />
     <UpdateItemModal isOpen={modalType === "update"} onClose={closeModal} />

      <Card>
        <CardContent className="p-6 space-y-4 ">
          <InventoryHeader />
          <InventorySearch />
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-left border-collapse p-10">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name </th>
                  <th className="p-3">Category</th>
                   <th className="p-3">Quantity</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <InventoryTableBody onUpdateClick={() => setModalType("update")} />
              
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
