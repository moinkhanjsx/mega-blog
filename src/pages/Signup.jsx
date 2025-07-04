import React from 'react';
import { Signup as SignupComponent } from '../components';

export default function Signup() {
  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-white via-gray-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center">
      <SignupComponent />
    </div>
  );
}