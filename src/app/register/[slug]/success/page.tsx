import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RegisterSuccess from '@/components/RegisterSuccess';
import { EVENTS } from '@/data/events';
import '../../register.css';

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
    return { title: 'Registered | ASTRA 2K26' };
  }
  return {
    title: `Registered — ${event.name} | ASTRA 2K26`,
    description: `Your ${event.name} team is registered for ASTRA 2K26.`,
  };
}

export default async function RegisterSuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ code?: string; team?: string }>;
}) {
  const { slug } = await params;
  const { code, team } = await searchParams;
  if (!EVENTS.some((item) => item.slug === slug)) {
    notFound();
  }
  return <RegisterSuccess eventSlug={slug} code={code} team={team} />;
}