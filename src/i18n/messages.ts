import type { Locale } from './locale';

type MessageCatalog = Record<string, string>;

const fr: MessageCatalog = {
  'pages.cms.loading': 'Chargement du contenu…',
  'pages.cms.error.title': 'Impossible de charger le contenu',
  'pages.cms.error.description': 'Le catalogue est momentanément indisponible. Vérifiez votre connexion puis réessayez.',
  'pages.cms.error.retry': 'Réessayer',
};

const en: MessageCatalog = {
  'pages.cms.loading': 'Loading content…',
  'pages.cms.error.title': 'Unable to load content',
  'pages.cms.error.description': 'The catalogue is temporarily unavailable. Check your connection and try again.',
  'pages.cms.error.retry': 'Try again',
};

export const messages: Record<Locale, MessageCatalog> = { fr, en };
