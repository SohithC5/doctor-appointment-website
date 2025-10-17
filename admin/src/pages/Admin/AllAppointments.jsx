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
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-3 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold'>
                {item.userData?.name ? item.userData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'}
              </div>
              <p>{item.userData?.name || 'Unknown User'}</p>
            </div>

            <p className='max-sm:hidden'>{item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold'>
                {item.docData?.name ? item.docData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'DR'}
              </div>
              <p>{item.docData?.name || 'Unknown Doctor'}</p>
            </div>

            <p>{currency}{item.amount}</p>

            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }

          </div>
        ))}

      </div>
    </div>
  )
}

export default AllAppointments