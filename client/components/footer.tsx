import React from 'react'
import {  Phone } from 'lucide-react';
const Footer = () => {
  return (
 <footer className="w-full h-[36px] bg-[#111621] border-t-2 border-slate-400/20 shadow-xl flex items-center justify-between px-10 text-white">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <p className="text-xs font-medium">Created by Abdelrhman Osama</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Phone className="w-3 h-3 text-indigo-400" />
        <p className="text-xs font-medium">Support: 01228584655</p>
      </div>
    </footer>
  )
}

export default Footer