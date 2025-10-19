import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorDashboard = () => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const getDoctorProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: { dtoken: dToken },
      });
      if (data.success) {
        setDoctorData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch doctor profile");
    }
  };

  const logout = () => {
    localStorage.removeItem("dToken");
    window.location.reload();
  };

  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Doctor Portal
              </h1>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Welcome back!</h2>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your practice today.
          </p>
        </div>

        {doctorData ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Dr. {doctorData.name}
                </h2>
                <p className="text-gray-600">{doctorData.speciality}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">
                  Profile Information
                </h3>
                <p>
                  <span className="font-medium">Email:</span> {doctorData.email}
                </p>
                <p>
                  <span className="font-medium">Degree:</span>{" "}
                  {doctorData.degree}
                </p>
                <p>
                  <span className="font-medium">Experience:</span>{" "}
                  {doctorData.experience}
                </p>
                <p>
                  <span className="font-medium">Fees:</span> ${doctorData.fees}
                </p>
                <p>
                  <span className="font-medium">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      doctorData.available
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {doctorData.available ? "Available" : "Not Available"}
                  </span>
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">About</h3>
                <p className="text-gray-600">{doctorData.about}</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
              <p className="text-gray-600">
                {doctorData.address?.line1}, {doctorData.address?.line2}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading doctor profile...</p>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold text-gray-700">
              Total Appointments
            </h4>
            <p className="text-2xl font-bold text-blue-500">-</p>
            <p className="text-gray-500 text-sm">Coming soon</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold text-gray-700">
              Today&apos;s Appointments
            </h4>
            <p className="text-2xl font-bold text-green-500">-</p>
            <p className="text-gray-500 text-sm">Coming soon</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h4 className="text-lg font-semibold text-gray-700">Earnings</h4>
            <p className="text-2xl font-bold text-purple-500">-</p>
            <p className="text-gray-500 text-sm">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
