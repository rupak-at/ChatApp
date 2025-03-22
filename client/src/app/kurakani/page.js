import React from 'react'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home


// // /kurakani/page.js
// "use client";
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { 
//   Bell, 
//   Search, 
//   MessageSquare, 
//   Users, 
//   LogOut, 
//   Settings, 
//   ChevronRight, 
//   Star, 
//   Zap, 
//   Clock, 
//   Plus 
// } from 'lucide-react';

// export default function KurakaniHome() {
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Mock user data - replace with your actual user data from auth
//   const user = {
//     username: "Rohan Sharma",
//     avatar: "RS",
//     status: "online",
//     lastActive: "Just now"
//   };
  
//   // Mock recent chats - replace with your actual data
//   const recentChats = [
//     { id: 1, name: "Anika Patel", avatar: "AP", lastMessage: "Are we still meeting tomorrow?", time: "5m ago", unread: 3, type: "single" },
//     { id: 2, name: "Dev Team", avatar: "DT", lastMessage: "Sunil: I've fixed the API issue", time: "32m ago", unread: 12, type: "group" },
//     { id: 3, name: "Priya Singh", avatar: "PS", lastMessage: "Thanks for the update", time: "1h ago", unread: 0, type: "single" },
//     { id: 4, name: "Project Kurakani", avatar: "PK", lastMessage: "Meeting scheduled for 3PM", time: "3h ago", unread: 0, type: "group" }
//   ];
  
//   // Mock suggested contacts - replace with your actual data
//   const suggestedContacts = [
//     { id: 1, name: "Nikhil Gupta", avatar: "NG", role: "Product Manager", status: "online" },
//     { id: 2, name: "Meera Joshi", avatar: "MJ", role: "UI Designer", status: "offline" },
//     { id: 3, name: "Arjun Kumar", avatar: "AK", role: "Frontend Developer", status: "online" }
//   ];

//   return (
//     <div className="flex h-screen bg-gray-900 text-gray-100">
//       {/* Left Sidebar with user profile and navigation */}
//       <div className="w-20 md:w-64 flex flex-col bg-gray-900 border-r border-gray-800">
//         {/* User Profile */}
//         <div className="p-4 border-b border-gray-800">
//           <div className="flex items-center">
//             <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
//               {user.avatar}
//             </div>
//             <div className="ml-3 hidden md:block">
//               <div className="font-medium">{user.username}</div>
//               <div className="text-xs text-gray-400 flex items-center">
//                 <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
//                 {user.status}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Navigation */}
//         <nav className="flex-1 py-6">
//           <ul className="space-y-2">
//             <li>
//               <Link href="/kurakani" className="flex items-center py-3 px-4 text-gray-100 bg-gray-800 rounded-lg mx-2">
//                 <MessageSquare size={20} className="md:mr-3" />
//                 <span className="hidden md:block">All Chats</span>
//               </Link>
//             </li>
//             <li>
//               <Link href="/kurakani/chat" className="flex items-center py-3 px-4 text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg mx-2">
//                 <Users size={20} className="md:mr-3" />
//                 <span className="hidden md:block">Direct Messages</span>
//               </Link>
//             </li>
//             <li>
//               <Link href="/kurakani/group" className="flex items-center py-3 px-4 text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg mx-2">
//                 <Users size={20} className="md:mr-3" />
//                 <span className="hidden md:block">Group Chats</span>
//               </Link>
//             </li>
//             <li>
//               <Link href="/kurakani/settings" className="flex items-center py-3 px-4 text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg mx-2">
//                 <Settings size={20} className="md:mr-3" />
//                 <span className="hidden md:block">Settings</span>
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Logout */}
//         <div className="p-4 border-t border-gray-800">
//           <Link href="/kurakani/logout" className="flex items-center py-2 px-4 text-gray-400 hover:text-gray-100 rounded-lg">
//             <LogOut size={20} className="md:mr-3" />
//             <span className="hidden md:block">Logout</span>
//           </Link>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Top navigation */}
//         <header className="h-16 flex items-center px-6 border-b border-gray-800">
//           <h1 className="text-xl font-semibold">Kurakani</h1>
          
//           <div className="relative ml-6 flex-1 max-w-md">
//             <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search messages or contacts..."
//               className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
          
//           <div className="ml-auto flex items-center space-x-4">
//             <button className="relative p-2 rounded-full text-gray-400 hover:text-gray-100 hover:bg-gray-800">
//               <Bell size={20} />
//               <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
//             </button>
//             <button className="p-2 rounded-full text-gray-400 hover:text-gray-100 hover:bg-gray-800">
//               <Settings size={20} />
//             </button>
//           </div>
//         </header>

//         {/* Dashboard Content */}
//         <main className="flex-1 overflow-auto p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Recent Activity */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Welcome Card */}
//               <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-xl p-6 shadow-lg">
//                 <h2 className="text-2xl font-bold mb-2">Welcome back, {user.username.split(' ')[0]}!</h2>
//                 <p className="text-indigo-200 mb-4">You have 3 unread messages and 1 pending group invitation.</p>
//                 <div className="flex space-x-4">
//                   <Link href="/kurakani/chat" className="px-4 py-2 bg-white text-indigo-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
//                     Check Messages
//                   </Link>
//                   <Link href="/kurakani/group" className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
//                     View Groups
//                   </Link>
//                 </div>
//               </div>

//               {/* Recent Conversations */}
//               <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
//                 <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//                   <h3 className="text-lg font-semibold">Recent Conversations</h3>
//                   <Link href="/kurakani/chat" className="text-indigo-400 text-sm flex items-center hover:text-indigo-300">
//                     View All <ChevronRight size={16} />
//                   </Link>
//                 </div>
//                 <div className="divide-y divide-gray-700">
//                   {recentChats.map(chat => (
//                     <Link 
//                       key={chat.id} 
//                       href={chat.type === 'single' ? `/kurakani/chat/${chat.id}` : `/kurakani/group/${chat.id}`}
//                       className="flex items-center p-4 hover:bg-gray-700 transition-colors"
//                     >
//                       <div className="relative">
//                         <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
//                           {chat.avatar}
//                         </div>
//                         {chat.unread > 0 && (
//                           <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
//                             {chat.unread > 9 ? '9+' : chat.unread}
//                           </div>
//                         )}
//                       </div>
//                       <div className="ml-4 flex-1">
//                         <div className="flex justify-between">
//                           <span className="font-semibold">{chat.name}</span>
//                           <span className="text-xs text-gray-400">{chat.time}</span>
//                         </div>
//                         <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
//                       </div>
//                       <ChevronRight size={16} className="text-gray-500" />
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Sidebar */}
//             <div className="space-y-6">
//               {/* Quick Actions */}
//               <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
//                 <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   <Link href="/kurakani/chat/new" className="flex flex-col items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
//                     <MessageSquare size={24} className="text-indigo-400 mb-2" />
//                     <span className="text-sm">New Chat</span>
//                   </Link>
//                   <Link href="/kurakani/group/new" className="flex flex-col items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
//                     <Users size={24} className="text-indigo-400 mb-2" />
//                     <span className="text-sm">New Group</span>
//                   </Link>
//                   <Link href="/kurakani/starred" className="flex flex-col items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
//                     <Star size={24} className="text-indigo-400 mb-2" />
//                     <span className="text-sm">Starred</span>
//                   </Link>
//                   <Link href="/kurakani/settings" className="flex flex-col items-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
//                     <Settings size={24} className="text-indigo-400 mb-2" />
//                     <span className="text-sm">Settings</span>
//                   </Link>
//                 </div>
//               </div>

//               {/* Suggested Contacts */}
//               <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
//                 <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//                   <h3 className="text-lg font-semibold">Suggested Contacts</h3>
//                   <button className="text-indigo-400 hover:text-indigo-300">
//                     <Plus size={18} />
//                   </button>
//                 </div>
//                 <div className="divide-y divide-gray-700">
//                   {suggestedContacts.map(contact => (
//                     <div key={contact.id} className="flex items-center p-4 hover:bg-gray-700 transition-colors">
//                       <div className="relative">
//                         <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium">
//                           {contact.avatar}
//                         </div>
//                         <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
//                       </div>
//                       <div className="ml-3 flex-1">
//                         <div className="font-medium">{contact.name}</div>
//                         <div className="text-xs text-gray-400">{contact.role}</div>
//                       </div>
//                       <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors">
//                         Connect
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
//                 <h3 className="text-lg font-semibold mb-3">Your Activity</h3>
//                 <div className="space-y-3">
//                   <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
//                     <div className="flex items-center">
//                       <MessageSquare size={18} className="text-indigo-400 mr-2" />
//                       <span>Active Chats</span>
//                     </div>
//                     <span className="font-semibold">12</span>
//                   </div>
//                   <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
//                     <div className="flex items-center">
//                       <Users size={18} className="text-indigo-400 mr-2" />
//                       <span>Group Chats</span>
//                     </div>
//                     <span className="font-semibold">4</span>
//                   </div>
//                   <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
//                     <div className="flex items-center">
//                       <Zap size={18} className="text-indigo-400 mr-2" />
//                       <span>Messages Today</span>
//                     </div>
//                     <span className="font-semibold">37</span>
//                   </div>
//                   <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
//                     <div className="flex items-center">
//                       <Clock size={18} className="text-indigo-400 mr-2" />
//                       <span>Response Time</span>
//                     </div>
//                     <span className="font-semibold">5m</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }