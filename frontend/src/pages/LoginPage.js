import React, { useState } from 'react';
import authService from '../../src/services/authService';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TailSpin } from 'react-loader-spinner';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authService.login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      setApiError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-white p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        {loading && (
          <div className="flex justify-center mb-4">
            <TailSpin color="#00BFFF" height={30} width={30} />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: 'Email is required' })}
              className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
              }`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby="email-error"
            />
            {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password', { required: 'Password is required' })}
                className={`mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12.5A3.5 3.5 0 1111 9a3.5 3.5 0 014 3.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 12c0-2.5 5-9 11-9s11 6.5 11 9-5 9-11 9S1 14.5 1 12z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15.5A3.5 3.5 0 1015 12a3.5 3.5 0 00-3 3.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 12c0-2.5 5-9 11-9s11 6.5 11 9-5 9-11 9S1 14.5 1 12z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p id="password-error" className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            Login
          </button>

          {apiError && <p className="text-red-500 text-xs mt-3">{apiError}</p>}

          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
