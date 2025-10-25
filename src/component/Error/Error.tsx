'use client';
import { useLang } from '@/hooks/useLang';
import { Alert } from '@mantine/core';
import { AiOutlineWarning } from 'react-icons/ai';
import { useState } from 'react';

export default function ErrorMessage(
  { message }: { message: string }
) {
  const { ready, t } = useLang();
  const [visible, setVisible] = useState(true);
  if (!ready || !visible) return null;

  return (
    <Alert
      icon={<AiOutlineWarning size={20} />}
      title={t.error}
      color="red"
      radius="md"
      variant="filled" 
      withCloseButton
      onClose={() => setVisible(false)}
      style={{
        position: 'fixed',
        top: 20,
        right: 1,
        zIndex: 9999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        cursor: 'default',
      }}
      className='pages'
    >
      {message && `${t.not_success}`}
    </Alert>
  );
}
