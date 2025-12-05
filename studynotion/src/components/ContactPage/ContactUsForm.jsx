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
    <form onSubmit={handleSubmit(SubmitContactForm)} className="space-y-6">
      <div className='flex gap-5 flex-col'>
        {/* firstName */}
        <div className='flex flex-col'>
          <label htmlFor="firstname" className="text-sm font-semibold text-white mb-2">
            First Name <sup className="text-red-500">*</sup>
          </label>
          <input
            type='text'
            name='firstname'
            id='firstname'
            placeholder='Enter your first name'
            className='w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            {...register("firstname", { required: "First name is required" })}
          />
          {errors.firstname && (
            <span className="text-red-500 text-sm font-medium mt-1">
              {errors.firstname.message}
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className='flex flex-col'>
          <label htmlFor="lastname" className="text-sm font-semibold text-white mb-2">
            Last Name <sup className="text-red-500">*</sup>
          </label>
          <input
            type='text'
            name='lastname'
            id='lastname'
            placeholder='Enter your last name'
            className='w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            {...register("lastname", { required: "Last name is required" })}
          />
          {errors.lastname && (
            <span className="text-red-500 text-sm font-medium mt-1">
              {errors.lastname.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div className='flex flex-col'>
          <label htmlFor='email' className="text-sm font-semibold text-white mb-2">
            Email Address <sup className="text-red-500">*</sup>
          </label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email address'
            className='w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-medium mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div className='flex flex-col'>
          <label htmlFor='phoneNo' className="text-sm font-semibold text-white mb-2">
            Phone Number <sup className="text-red-500">*</sup>
          </label>

          <div className='flex gap-3'>
            {/* Country Code Dropdown */}
            <div className='w-[140px]'>
              <select
                name='countrycode'
                id="countrycode"
                className='w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-medium'
                {...register("countrycode", { required: "Country code is required" })}
              >
                <option value="">Select Code</option>
                {contrycode.map((element, index) => {
                  return (
                    <option key={index} value={element.code}>
                      {element.code}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* Phone Number Input */}
            <div className='flex-1'>
              <input
                type='tel'
                name='phoneNo'
                id='phoneNo'
                placeholder='10-digit number'
                className='w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                {...register("phoneNo", {
                  required: "Phone number is required",
                  minLength: { value: 8, message: "Phone number must be at least 8 digits" },
                  maxLength: { value: 15, message: "Phone number must be at most 15 digits" },
                  pattern: { value: /^[0-9]+$/, message: "Phone number must contain only digits" }
                })}
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="text-red-500 text-sm font-medium mt-1">
              {errors.phoneNo.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div className='flex flex-col'>
          <label htmlFor='message' className="text-sm font-semibold text-white mb-2">
            Message <sup className="text-red-500">*</sup>
          </label>
          <textarea
            name='message'
            id='message'
            rows="5"
            placeholder='Enter your message here...'
            className='w-full bg-white text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none'
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <span className="text-red-500 text-sm font-medium mt-1">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed mt-6'
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )

}

export default ContactUsForm