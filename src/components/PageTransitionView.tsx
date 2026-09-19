'use client';

import { type ReactNode, ViewTransition } from 'react';

export default function PageTransitionView({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ViewTransition enter="pt-enter" exit="pt-exit" default="none">
      {children}
    </ViewTransition>
  );
}
