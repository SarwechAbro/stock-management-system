import { useState } from 'react';
import { FaBoxes, FaWarehouse, FaFileInvoice, FaHome, } from 'react-icons/fa';
import classnames from 'classnames';


const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    {name: 'Dashboard', icon: <FaHome />},
    { name: 'Item Management', icon: <FaBoxes /> },
    { name: 'Stock Management', icon: <FaWarehouse /> },
    { name: 'Invoices', icon: <FaFileInvoice /> },
  ];

  return (
    <div className={classnames(
      'h-screen bg-gray-100 text-gray-700 transition-all duration-300 flex flex-col items-center py-4 shadow-lg relative ',
      isCollapsed ? 'w-20' : 'w-64',
    )}>
      {/* Collapse Toggle Icon */}
      <div className='absolute top-2 right-2 cursor-pointer p-1 rounded'
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 3v18"></path></svg>

      </div>

      {/* Logo Placeholder */}
      <div className="mb-10 mt-10">
        <div className={`transition-all duration-300 rounded-full bg-green-600 flex items-center justify-center ${isCollapsed ? 'w-14 h-14' : 'w-28 h-28'}`}>
          <img
            src="https://pdmi.sindhculture.gov.pk/wp-content/uploads/2023/10/sindhlogo.png"
            alt="Logo"
            className={`transition-all duration-300 ${isCollapsed ? 'w-10 h-10' : 'w-20 h-20'}`}
          />

        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col space-y-4 w-full px-2">
        {tabs.map((tab, index) => (
          <div
            
            onClick={() => setActiveTab(tab.name)}
            key={index}
            className={`flex items-center space-x-2  rounded-lg px-5 py-2 cursor-pointer ${activeTab === tab.name ? "bg-gray-300 font-semibold" : "hover:bg-gray-300"
              }`}

          >
          
            <span className="text-xl ">{tab.icon}</span>
            {!isCollapsed && <span className="text-md">{tab.name}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
