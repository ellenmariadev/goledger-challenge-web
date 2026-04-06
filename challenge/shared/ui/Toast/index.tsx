"use client";

import * as React from "react";
import { Toast } from "@base-ui/react/toast";
import styles from "./toast.module.css";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <Toast.Provider>
      {children}
      <ToastViewport />
    </Toast.Provider>
  );
}

export function useToast() {
  return Toast.useToastManager();
}

function ToastViewport() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Viewport className={styles.viewport}>
      {toasts.map((toast) => (
        <Toast.Root key={toast.id} toast={toast} className={styles.toast}>
          <Toast.Content className={styles.content}>
            <Toast.Title className={styles.title} />
            <Toast.Description className={styles.description} />
            <Toast.Close className={styles.close} aria-label="Close">
              <XIcon className={styles.icon} />
            </Toast.Close>
          </Toast.Content>
        </Toast.Root>
      ))}
    </Toast.Viewport>
  );
}

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
