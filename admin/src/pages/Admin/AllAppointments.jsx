import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets_admin/assets'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 border-b font-medium'>
          <p className="text-left text-gray-600">#</p>
          <p className="text-left text-gray-600">Patient</p>
          <p className="text-left text-gray-600">Age</p>
          <p className="text-left text-gray-600">Date & Time</p>
          <p className="text-left text-gray-600">Doctor</p>
          <p className="text-left text-gray-600">Fees</p>
          <p className="text-left text-gray-600">Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div className='grid grid-cols-[0.5fr_2fr_0.7fr_1.5fr_1.8fr_0.8fr_1fr] gap-4 items-center text-gray-600 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <span className='max-sm:hidden text-sm'>{index + 1}</span>

            <div className='grid grid-cols-[auto_1fr] gap-2 items-center min-w-0'>
              <div className='w-9 h-9 rounded-full bg-[#6C5FFC] bg-opacity-10 text-[#6C5FFC] grid place-items-center text-sm font-medium'>
                {item.userData?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm" title={item.userData?.name || 'Unknown User'}>
                  {item.userData?.name || 'Unknown User'}
                </p>
                {item.userData?.email && (
                  <p className="text-gray-400 text-xs truncate" title={item.userData.email}>
                    {item.userData.email}
                  </p>
                )}
              </div>
            </div>

            <span className='max-sm:hidden text-sm'>
              {item.userData?.dob ? 
                (!isNaN(calculateAge(item.userData.dob)) ? calculateAge(item.userData.dob) : '-') 
                : '-'}
            </span>

            <span className="text-sm whitespace-nowrap">{slotDateFormat(item.slotDate)}, {item.slotTime}</span>

            <div className='grid grid-cols-[auto_1fr] gap-2 items-center min-w-0'>
              <div className='w-9 h-9 rounded-full bg-[#6C5FFC] bg-opacity-10 text-[#6C5FFC] grid place-items-center text-sm font-medium'>
                {item.docData?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || 'DR'}
              </div>
              <p className="truncate text-sm" title={item.docData?.name || 'Unknown Doctor'}>
                {item.docData?.name || 'Unknown Doctor'}
              </p>
            </div>

            <span className="text-sm font-medium">${item.amount || '-'}</span>

            <div>
              {item.cancelled ? (
                <p className='text-[#FF4747] text-sm font-medium'>Cancelled</p>
              ) : (
                <button 
                  onClick={() => cancelAppointment(item._id)}
                  className='text-[#FF4747] hover:text-red-700 font-medium text-sm'
                >
                  Cancel
                </button>
              )}
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default AllAppointments