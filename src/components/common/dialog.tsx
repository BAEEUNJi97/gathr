'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({
  children,
  className = '',
  ...props
}: DialogPrimitive.DialogContentProps & { className?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      <DialogPrimitive.Content
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg ${className}`}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4">
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

// ✅ Radix 접근성 대응 완료
export const DialogTitle = ({
  children,
  className = '',
  ...props
}: DialogPrimitive.DialogTitleProps & { className?: string }) => (
  <DialogPrimitive.Title className={`text-lg font-semibold ${className}`} {...props}>
    {children}
  </DialogPrimitive.Title>
);

export function DialogDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm text-gray-500 mb-4">{children}</p>;
}
