"use client";

import { Button } from "@/shared/ui/Button";
import { AlertDialog as AlertDialogBase } from "@base-ui/react/alert-dialog";
import { AlertTriangle } from "lucide-react";
import styles from "./alertDialog.module.css";
import { AlertDialogProps } from "./alertDialog.types";

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "confirm",
  cancelLabel = "cancel",
  variant = "danger",
  onConfirm,
}: AlertDialogProps) {
  return (
    <AlertDialogBase.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialogBase.Portal>
        <AlertDialogBase.Backdrop className={styles.backdrop} />
        <AlertDialogBase.Popup className={styles.popup}>
          <div className={styles.iconWrapper} data-variant={variant}>
            <AlertTriangle size={16} />
          </div>

          <div className={styles.content}>
            <AlertDialogBase.Title className={styles.title}>
              {title}
            </AlertDialogBase.Title>
            {description && (
              <AlertDialogBase.Description className={styles.description}>
                {description}
              </AlertDialogBase.Description>
            )}
          </div>

          <div className={styles.actions}>
            <AlertDialogBase.Close
              render={
                <Button variant="secondary" size="xs">
                  {cancelLabel}
                </Button>
              }
            />
            <AlertDialogBase.Close
              render={
                <Button
                  size="xs"
                  data-variant={variant}
                  className={styles.confirmButton}
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </Button>
              }
            />
          </div>
        </AlertDialogBase.Popup>
      </AlertDialogBase.Portal>
    </AlertDialogBase.Root>
  );
}
