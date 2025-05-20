import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MoreVertical } from "lucide-react";
import { useEffect, useRef } from "react";
import { AddItemModal } from "../ui/addItemModal";
import { UpdateItemModal } from "../ui/updateItemModal";
import axios from "axios";
import toast from 'react-hot-toast';









export function PageHeader({ onAddClick }) {
  return (
    <div className="flex justify-between items-center pb-2 ">
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
      <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
        Inventory Items
      </h2>
      <p className="text-sm text-gray-500 mb-2">A list of all inventory items with details</p>
    </>
  );
}

export function InventorySearch( { search, setSearch }) {
  return <Input value={search}
      onChange={(e) => setSearch(e.target.value)} placeholder="Search items by name, or category..." className="mb-4" />;
}


export function InventoryTableBody({ onUpdateClick, items, search, handleDelete, filterdata }) {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const menuRef = useRef(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

 
  const filteredData = filterdata(items, search);


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
      {filteredData.map((item, idx) => (
        <tr key={idx} className="border-b hover:bg-gray-50">
          <td className="p-3">{item.id}</td>
          <td className="p-3 ">{item.name}</td>
          <td className="p-3">{item.category_name}</td>
         <td className={`pl-8 ${item.quantity < 10 ? "text-red-600" : "text-green-600"}`}>
            {item.quantity}
          </td>
          <td className="pl-7 text-eight">
            <div className="relative inline-block text-left">
              <MoreVertical
                className="h-5 w-5 text-gray-600 cursor-pointer transition-all duration-300"
                onClick={() => toggleMenu(idx)}
              />
              {openMenuIndex === idx && (

                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                  {confirmDeleteId === item.id ? (
                    <div className="px-2 py-2 text-sm">
                      <p>Confirm?</p>
                      <div className="flex justify-between mt-1">
                        <button
                          onClick={() => {
                            handleDelete(item.id);
                            setConfirmDeleteId(null);
                            setOpenMenuIndex(null);
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-gray-600 hover:underline"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => onUpdateClick(item)}
                      >
                        Update
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        onClick={() => setConfirmDeleteId(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                 
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
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  // fetch items from API 
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/items");
      setItems(res.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

useEffect(() => {
    fetchItems();
  }, []);

  // Delete item  
const handleDelete = async (itemId) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/items/${itemId}`);
    toast.success("Item deleted", { duration: 1500 });
    fetchItems(); // Refresh list
  } catch (error) {
    toast.error("Failed to delete");
    console.error("Delete failed:", error.response?.data || error.message);
  }
};
  
  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
    fetchItems(); // Refresh data after closing modal
  };
 
  const filterdata = (items, query) => {
    const lowerSearch = query.toLowerCase();
     
    return items.filter(item =>
      (item.name.toLowerCase() || "").includes(lowerSearch) ||
      (item.category_name?.toLowerCase() || "").includes(lowerSearch)
      
    );
  }

 
  return (
    <div className="w-full h-600 overflow-hidden p-6">
      <PageHeader onAddClick={() => setModalType("add")} />
      {modalType === "add" && (<AddItemModal isOpen onClose={closeModal} />)}

      {modalType === "update" && (<UpdateItemModal
        isOpen
        onClose={closeModal}
        item={selectedItem}
      />
      )}
      <Card  className="h-full flex flex-col">
        <CardContent className="p-5 flex-1 flex flex-col overflow-hidden">
          <InventoryHeader />
          <InventorySearch search={searchTerm} setSearch={setSearchTerm} />
          <div className="overflow-auto  max-h-[375px] border rounded-lg">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr className="border-b text-left text-gray-500">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name </th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <InventoryTableBody items={items} onUpdateClick={(item) => {
                setSelectedItem(item);
                setModalType("update");
              }} handleDelete={handleDelete} filterdata={filterdata} search={searchTerm} />

            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
