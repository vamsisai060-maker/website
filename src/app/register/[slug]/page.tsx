import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RegisterPage from '@/components/RegisterPage';
import { EVENTS } from '@/data/events';
import '../register.css';

export function generateStaticParams() {
  return EVENTS.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS.find((item) => item.slug === slug);
  if (!event) {
    return { title: 'Register | ASTRA 2K26' };
  }
  return {
    title: `Register ${event.name} | ASTRA 2K26`,
    description: `Register for ${event.name} at ASTRA 2K26 external events.`,
  };
}

export default async function EventRegisterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!EVENTS.some((item) => item.slug === slug)) {
    notFound();
  }
  return <RegisterPage slug={slug} locked />;
}