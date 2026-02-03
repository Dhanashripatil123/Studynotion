import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
// import { apiConnector } from "../../services/apiconnector"
// import { contactEndpoints } from "../../services/apis"
import contrycode from "../../data/contrycode";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm();

  const SubmitContactForm = async (data) => {
    console.log("Logging Data", data);
    try {
      setLoading(true);
      // Uncomment when API is ready
      // const response = await apiConnector("POST", contactEndpoints.CONTACT_US_API, data);
      const response = { status: "OK" }
      console.log("Logging response", response);
      
      if (response.status === "OK") {
        toast.success("Message sent successfully! We'll get back to you soon.");
      }
      setLoading(false);
    }
    catch (error) {
      console.log("Error", error.message);
      toast.error("Failed to send message. Please try again.");
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        phoneNo: "",
        message: "",
        countrycode: ""
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(SubmitContactForm)} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First & Last Name (two column) */}
        <div className="flex flex-col">
          <label htmlFor="firstname" className="text-sm font-semibold text-gray-200 mb-2">First Name <sup className="text-red-500">*</sup></label>
          <input
            type="text"
            id="firstname"
            placeholder="Enter first name"
            className="w-full bg-[#0f1720] placeholder-gray-400 text-gray-100 px-4 py-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            {...register("firstname", { required: "First name is required" })}
          />
          {errors.firstname && <span className="text-red-500 text-sm font-medium mt-1">{errors.firstname.message}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="lastname" className="text-sm font-semibold text-gray-200 mb-2">Last Name <sup className="text-red-500">*</sup></label>
          <input
            type="text"
            id="lastname"
            placeholder="Enter last name"
            className="w-full bg-[#0f1720] placeholder-gray-400 text-gray-100 px-4 py-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            {...register("lastname", { required: "Last name is required" })}
          />
          {errors.lastname && <span className="text-red-500 text-sm font-medium mt-1">{errors.lastname.message}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-200 mb-2">Email Address <sup className="text-red-500">*</sup></label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            className="w-full bg-[#0f1720] placeholder-gray-400 text-gray-100 px-4 py-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
          />
          {errors.email && <span className="text-red-500 text-sm font-medium mt-1">{errors.email.message}</span>}
        </div>

        {/* Phone number (country + number) */}
        <div className="flex flex-col">
          <label htmlFor="phoneNo" className="text-sm font-semibold text-gray-200 mb-2">Phone Number <sup className="text-red-500">*</sup></label>
          <div className="flex gap-3">
            <div className="w-36">
              <select
                id="countrycode"
                className="w-full bg-[#0b1216] text-gray-100 px-3 py-2 rounded-l-md border border-gray-700 focus:outline-none font-medium transition"
                {...register("countrycode", { required: "Country code is required" })}
              >
                <option value="">+91</option>
                {contrycode.map((element, index) => (
                  <option key={index} value={element.code}>{element.code}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <input
                type="tel"
                id="phoneNo"
                placeholder="12345 67890"
                className="w-full bg-[#0f1720] placeholder-gray-400 text-gray-100 px-4 py-3 rounded-r-md border border-gray-700 focus:outline-none transition"
                {...register("phoneNo", {
                  required: "Phone number is required",
                  minLength: { value: 8, message: "Phone number must be at least 8 digits" },
                  maxLength: { value: 15, message: "Phone number must be at most 15 digits" },
                  pattern: { value: /^[0-9\s]+$/, message: "Phone number must contain only digits" }
                })}
              />
            </div>
          </div>
          {errors.phoneNo && <span className="text-red-500 text-sm font-medium mt-1">{errors.phoneNo.message}</span>}
        </div>

        {/* Message (full width) */}
        <div className="md:col-span-2 flex flex-col">
          <label htmlFor="message" className="text-sm font-semibold text-gray-200 mb-2">Message <sup className="text-red-500">*</sup></label>
          <textarea
            id="message"
            rows="8"
            placeholder="Enter your message here"
            className="w-full bg-[#0f1720] placeholder-gray-400 text-gray-100 px-4 py-4 rounded-md border border-gray-700 resize-none transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && <span className="text-red-500 text-sm font-medium mt-1">{errors.message.message}</span>}
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );

}

export default ContactUsForm