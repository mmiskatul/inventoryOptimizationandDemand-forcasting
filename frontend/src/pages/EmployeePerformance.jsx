import React, { useState, useEffect, useMemo } from 'react';
import { Search, Calendar, Star, ChevronRight, User, Clock, X, Award, TrendingUp } from 'lucide-react';

// --- INITIAL MOCK DATA ---
const initialEmployees = [
  { id: 1, name: 'Miskatul Masabi', role: 'Inventory Manager', avatar: 'JD', rating: 4 },
  { id: 2, name: 'mohammad', role: 'Sales Executive', avatar: 'JS', rating: 5 },
  { id: 3, name: 'Kafia', role: 'Procurement Specialist', avatar: 'MJ', rating: 3 },
  { id: 4, name: 'joma akter', role: 'Customer Service', avatar: 'SW', rating: 5 },
];

const allAttendanceData = [
  { employeeId: 1, name: 'Miskat', date: '2025-08-25', checkIn: '09:02 AM', checkOut: '05:05 PM', hours: '8.05' },
  { employeeId: 2, name: 'Masabi', date: '2025-08-25', checkIn: '08:55 AM', checkOut: '05:01 PM', hours: '8.06' },
  { employeeId: 3, name: 'Miskatul Masabi', date: '2025-08-25', checkIn: '09:10 AM', checkOut: '05:15 PM', hours: '8.05' },
  { employeeId: 4, name: 'mohammad', date: '2025-08-25', checkIn: '08:59 AM', checkOut: '05:00 PM', hours: '8.01' },
  { employeeId: 1, name: 'joma', date: '2025-08-26', checkIn: '08:58 AM', checkOut: '05:01 PM', hours: '8.03' },
  { employeeId: 2, name: 'kafia sheikh', date: '2025-08-26', checkIn: '09:01 AM', checkOut: '04:55 PM', hours: '7.54' },
  { employeeId: 3, name: 'Miskat', date: '2025-08-27', checkIn: '09:00 AM', checkOut: '05:00 PM', hours: '8.00' },
  { employeeId: 4, name: 'Mohammad', date: '2025-08-28', checkIn: '09:05 AM', checkOut: '05:02 PM', hours: '7.57' },
];

const allActivityLogs = [
    { employeeId: 1, date: '2025-08-25', time: '10:45 AM', action: 'Updated Stock', details: 'Set quantity of A4 Paper to 500' },
    { employeeId: 2, date: '2025-08-25', time: '10:50 AM', action: 'Closed Sale', details: 'Finalized deal with Acme Corp.' },
    { employeeId: 1, date: '2025-08-26', time: '11:30 AM', action: 'Processed Return', details: 'Handled return for order #1025' },
    { employeeId: 3, date: '2025-08-25', time: '11:45 AM', action: 'Contacted Supplier', details: 'Negotiated pricing for new inventory.' },
    { employeeId: 4, date: '2025-08-28', time: '12:10 PM', action: 'Resolved Ticket', details: 'Assisted customer with login issue #T-5830' },
];


// --- CHILD COMPONENTS FOR EACH VIEW ---

const EmployeesView = ({ employees, onSelectEmployee, searchTerm, setSearchTerm }) => (
  <div>
    <header className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
      <p className="text-gray-600 mt-1">Select an employee to view their performance details.</p>
    </header>
    <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
    </div>
    <div className="bg-white rounded-lg border border-gray-200">
      <ul className="divide-y divide-gray-200">
        {employees.map(employee => (
          <li
            key={employee.id}
            onClick={() => onSelectEmployee(employee)}
            className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center">
              <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <span className="font-bold text-indigo-600">{employee.avatar}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{employee.name}</p>
                <p className="text-sm text-gray-500">{employee.role}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span className="font-semibold text-gray-700">{employee.rating.toFixed(1)}</span>
                <Star className="h-4 w-4 ml-1 text-yellow-400 fill-current"/>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </li>
        ))}
         {employees.length === 0 && (
            <li className="p-4 text-center text-gray-500">No employees found.</li>
        )}
      </ul>
    </div>
  </div>
);

const AttendanceView = ({ attendanceData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('2025-08-01');
    const [toDate, setToDate] = useState('2025-08-31');

    const filteredData = useMemo(() => {
        return attendanceData.filter(log => {
            const logDate = new Date(log.date);
            const start = new Date(fromDate);
            const end = new Date(toDate);

            const matchesSearch = log.name.toLowerCase().includes(searchTerm.toLowerCase());
            const isInDateRange = logDate >= start && logDate <= end;

            return matchesSearch && isInDateRange;
        });
    }, [attendanceData, searchTerm, fromDate, toDate]);


  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Attendance</h1>
        <p className="text-gray-600 mt-1">Review attendance records for all employees.</p>
      </header>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input type="text" placeholder="Search Employee" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"/>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Employee</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Check-in</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Check-out</th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{row.name}</td>
                  <td className="px-4 py-3 text-gray-700">{row.date}</td>
                  <td className="px-4 py-3 text-gray-700">{row.checkIn}</td>
                  <td className="px-4 py-3 text-gray-700">{row.checkOut}</td>
                  <td className="px-4 py-3 text-gray-700">{row.hours}</td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">No attendance records found for the selected criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const PerformanceDashboard = ({ employees, onSelectEmployee }) => {
    const topPerformers = [...employees].sort((a, b) => b.rating - a.rating).slice(0, 2);
    const averageRating = employees.reduce((acc, emp) => acc + emp.rating, 0) / employees.length;

    return (
        <div>
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Performance Dashboard</h1>
                <p className="text-gray-600 mt-1">An overview of the entire team's performance.</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">Team Average Rating</h3>
                    <div className="flex items-center justify-center space-x-2">
                        <Star className="h-10 w-10 text-yellow-400 fill-current" />
                        <span className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                        <span className="text-lg text-gray-500">/ 5</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4">Top Performers</h3>
                    <ul className="space-y-3">
                        {topPerformers.map(emp => (
                            <li key={emp.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="font-bold text-sm text-indigo-600">{emp.avatar}</span>
                                    </div>
                                    <span className="font-medium text-gray-800">{emp.name}</span>
                                </div>
                                <div className="flex items-center text-sm font-semibold text-yellow-500">
                                    {emp.rating.toFixed(1)} <Star className="h-4 w-4 ml-1 fill-current" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
             <div className="mt-6 text-center text-gray-500">
                Select an employee from the <button onClick={() => onSelectEmployee(null)} className="text-indigo-600 font-medium hover:underline">'Employees'</button> tab to see individual details.
            </div>
        </div>
    );
};

const PerformanceView = ({ employee, onSaveRating }) => {
  const [rating, setRating] = useState(employee.rating);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    setRating(employee.rating);
  }, [employee]);

  const employeeAttendance = allAttendanceData.filter(a => a.employeeId === employee.id);
  const employeeActivity = allActivityLogs.filter(a => a.employeeId === employee.id);

  const handleSave = () => {
    onSaveRating(employee.id, rating);
    setSaveStatus('Saved!');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const StarRating = ({ rating, setRating }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`h-8 w-8 cursor-pointer transition-colors ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} onClick={() => setRating(star)}/>
      ))}
    </div>
  );

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{employee.name}</h1>
        <p className="text-gray-600 mt-1">{employee.role}</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Attendance & Work Hours</h3>
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Check-in</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Check-out</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600">Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employeeAttendance.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-700">{row.date}</td>
                      <td className="px-4 py-3 text-gray-700">{row.checkIn}</td>
                      <td className="px-4 py-3 text-gray-700">{row.checkOut}</td>
                      <td className="px-4 py-3 text-gray-700">{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Activity Log</h3>
               <table className="w-full text-sm">
                 <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Date</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Time</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Action</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {employeeActivity.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-700">{row.date}</td>
                        <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{row.time}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{row.action}</td>
                        <td className="px-4 py-3 text-gray-700">{row.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit">
            <h3 className="font-semibold text-gray-800 mb-4 text-center">Performance Rating</h3>
            <div className="flex justify-center mb-6"><StarRating rating={rating} setRating={setRating} /></div>
            <div className="flex items-center justify-center space-x-4">
              <button onClick={handleSave} className="w-full px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                Save Rating
              </button>
              <span className="text-sm font-medium text-green-600 h-5 w-12 text-center">{saveStatus}</span>
            </div>
          </div>
        </div>
    </div>
  )
};


// --- MAIN PARENT COMPONENT ---
const EmployeePerformance = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [activeMenu, setActiveMenu] = useState('Employees');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setActiveMenu('Performance');
  }
  
  const handleMenuClick = (menu) => {
    if (menu === 'Employees') {
        setSelectedEmployee(null); // Clear selection when going back to the main list
    }
    setActiveMenu(menu);
  }

  const handleSaveRating = (employeeId, newRating) => {
    setEmployees(currentEmployees =>
      currentEmployees.map(emp =>
        emp.id === employeeId ? { ...emp, rating: newRating } : emp
      )
    );
    if (selectedEmployee && selectedEmployee.id === employeeId) {
        setSelectedEmployee(prev => ({...prev, rating: newRating}));
    }
  };
  
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => emp.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()));
  }, [employees, employeeSearchTerm]);

  const MenuButton = ({ label }) => (
    <button
      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${ activeMenu === label ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100' }`}
      onClick={() => handleMenuClick(label)}
    >
      {label}
    </button>
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'Employees':
        return <EmployeesView employees={filteredEmployees} onSelectEmployee={handleSelectEmployee} searchTerm={employeeSearchTerm} setSearchTerm={setEmployeeSearchTerm} />;
      case 'Attendance':
        return <AttendanceView attendanceData={allAttendanceData} />;
      case 'Performance':
        if (selectedEmployee) {
          return <PerformanceView employee={selectedEmployee} onSaveRating={handleSaveRating} />;
        }
        // If no employee is selected, show the new dashboard view
        return <PerformanceDashboard employees={employees} onSelectEmployee={() => handleMenuClick('Employees')} />;
      default:
        return <EmployeesView employees={filteredEmployees} onSelectEmployee={handleSelectEmployee} searchTerm={employeeSearchTerm} setSearchTerm={setEmployeeSearchTerm} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      <div className="w-64 bg-white p-4 border-r border-gray-200 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-800 mb-6 px-2">Menu</h2>
        <div className="space-y-2">
          <MenuButton label="Employees" />
          <MenuButton label="Attendance" />
          <MenuButton label="Performance" />
        </div>
      </div>

      <main className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default EmployeePerformance;
