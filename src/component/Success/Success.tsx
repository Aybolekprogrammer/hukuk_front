'use client';
import { useLang } from '@/hooks/useLang';
import { Alert } from '@mantine/core';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useState } from 'react';

export default function SuccessMessage({ message }: { message: string }) {
  const { ready, t } = useLang();
  const [visible, setVisible] = useState(true);

  if (!ready || !visible) return null;

  return (
    <Alert
      icon={<AiOutlineCheckCircle size={20} />}
      title={t.success}
      color="green"
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
      className="pages"
    >
      {/* {message} */}
    </Alert>
  );
}
