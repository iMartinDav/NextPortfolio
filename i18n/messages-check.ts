// Type-level guard: every locale must provide every key that English has.
// A missing translation fails `tsc` (and therefore the build).
import type en from '@/messages/en.json';
import es from '@/messages/es.json';
import fr from '@/messages/fr.json';

type Messages = typeof en;

export const localeMessages = {
  es: es satisfies Messages,
  fr: fr satisfies Messages
};
