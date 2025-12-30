 export default  function Attendance(){
   return(
 <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Employee Status</h2>
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-sm">
              <span className="text-gray-400">Filter By</span>
              <button className="flex items-center gap-2 border rounded-lg px-3 py-2">
                Date
                <span>▼</span>
              </button>
            </div>
            <div className="flex flex-col text-sm">
              <span className="text-gray-400">Select Date</span>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                30-12-2025
                📅
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded-xl p-4 flex items-center gap-4">
            <span className="w-4 h-4 rounded-full bg-purple-500" />
            <div>
              <p className="text-gray-500 text-sm">Present</p>
              <p className="text-xl font-semibold">0</p>
            </div>
          </div>
          <div className="border rounded-xl p-4 flex items-center gap-4">
            <span className="w-4 h-4 rounded-full bg-teal-400" />
            <div>
              <p className="text-gray-500 text-sm">Absent</p>
              <p className="text-xl font-semibold">11</p>
            </div>
          </div>
        </div>
      </div>
   )
 }