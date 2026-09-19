import type { Metadata } from 'next';
import RegisterPage from '@/components/RegisterPage';
import './register.css';

export const metadata: Metadata = {
  title: 'Register | ASTRA 2K26',
  description: 'Register your team for ASTRA 2K26 external events.',
};

export default function RegisterPageRoute() {
  return <RegisterPage />;
}