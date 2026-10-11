import '../src/index.js';

/** Compile-only checks for consumer-facing DOM type augmentation. */
export function verifyRainbowDomTypes(): void {
  const dialog = document.createElement('rainbow-dialog');
  dialog.open = true;
  dialog.modal = false;
  dialog.label = 'Typed dialog';
  dialog.show();
  dialog.close();

  const tabs = document.createElement('rainbow-tabs');
  tabs.selectedIndex = 1;
  tabs.orientation = 'vertical';

  const alert = document.createElement('rainbow-alert');
  alert.variant = 'success';
  alert.dismiss();
}
