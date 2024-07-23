import React, { useState } from 'react';
import authService from '../../src/services/authService';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loader-spinner';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm();

  const password = watch('password', '');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authService.signup(data.name, data.email, data.password);
      navigate('/login');
    } catch (error) {
      setApiError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-white p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Create an Account</h2>

        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-2">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby="name-error"
          />
          {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: 'Email is required' })}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby="email-error"
          />
          {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            aria-invalid={errors.password ? 'true' : 'false'}
            aria-describedby="password-error"
          />
          {errors.password && <p id="password-error" className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-5">
          <PasswordStrengthMeter password={password} />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <TailSpin color="#00BFFF" height={30} width={30} />
          </div>
        ) : (
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        )}

        {apiError && <p className="text-red-500 text-xs mt-3">{apiError}</p>}

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
};

// Password Strength Meter Component
const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (password) => {
    if (password.length < 6) return 'weak';
    if (password.length < 12) return 'medium';
    return 'strong';
  };

  const strength = getStrength(password);
  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
  };

  return (
    <div>
      <label htmlFor="password-strength" className="block text-sm font-semibold text-gray-600 mb-2">Password Strength</label>
      <div className="relative">
        <div
          id="password-strength"
          className={`h-2 rounded-full ${strengthColors[strength]} transition-all`}
          style={{ width: `${strength === 'weak' ? 33 : strength === 'medium' ? 66 : 100}%` }}
        />
      </div>
    </div>
  );
};

export default Signup;
