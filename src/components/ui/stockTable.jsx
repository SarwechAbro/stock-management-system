import { Card, CardContent } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";
import { StockTransactionModel } from "./addStockModal";




const inventoryData = [
  { name: "Desk Lamp",  quantity: 56, category: "Lighting" },
  { name: "Desk Organizer", sku: "ORG-007", price: "$24.99", quantity: 68, category: "Office Accessories" },
  { name: "Ergonomic Desk Chair", sku: "CHAIR-001", price: "$249.99", quantity: 45, category: "Office Furniture" },
  { name: "Monitor Stand", sku: "STAND-003", price: "$59.99", quantity: 32, category: "Office Accessories" },
  { name: "Notebook Bundle", sku: "NB-006", price: "$19.99", quantity: 120, category: "Stationery" },
];

export function PageHeader( { onAddClick }) {
  return (
    <div className="flex justify-between items-center pb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-600">Stock History</h1>
        <p className="text-gray-500 text-sm">view and analyse your stock</p>
      </div>
      <Button className="bg-green-700 hover:bg-green-800" onClick={onAddClick}>+ Add Stock Transition</Button>
    </div>
  );
}

export function StockHeader() {
  return (
    <>
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
         Stock Items
      </h2>
      <p className="text-sm text-gray-500 mb-4">A list of all inventory items with stock</p>
    </>
  );
}

export function StockSearch() {
   
   return (<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
     
      <Input placeholder="Search items by ID, name, or category..." className="w-full md:w-1/2" />
       <div className="flex gap-2 w-full md:w-auto">
        <Input type="date" className="w-full md:w-auto" />
        <Input type="date" className="w-full md:w-auto" />
        <Button className="bg-green-700 hover:bg-green-800">Export</Button>
      </div>
    </div>
   )
}



export function StockTableBody() {
  
  return (
    <tbody>
      {inventoryData.map((item, idx) => (
        <tr key={idx} className="border-b hover:bg-gray-50">
         <td className="p-3 ">{item.name}</td>
         <td className="pl-10 text-green-600">9</td>
        
           <td className="p-3 ">04/20/2025</td>
         
          <td className="p-3">{item.category}</td>
          <td className="pl-6 ">IT</td>
         
          <td className="pl-8"> Sarang</td>
          
          <td className="p-3"> The demo</td>
        </tr>
      ))}
    </tbody>
  );
}



export default function StockPage() {

   const [showModal, setShowModal] = useState(false);

  return (
    

    <div className="p-6">
     <PageHeader onAddClick={() => setShowModal(true)}/>
      <StockTransactionModel isOpen={showModal} onClose={() => setShowModal(false)} />
     
      <Card>
        <CardContent className="p-6 space-y-4 ">
          <StockHeader />
          <StockSearch />
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-left border-collapse p-10">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="p-3">Item</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Date Of Issue</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Section</th>
                  <th className="p-3">Name Of Employee</th>
                  <th className="p-3">Remarks</th>
                </tr>
              </thead>
              <StockTableBody />
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
