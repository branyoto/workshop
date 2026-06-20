export type Locale = 'fr' | 'en';

/** Bilingual text fields used across CMS content. */
export type LocalizedText = { fr: string; en?: string };

export type CharacteristicKey = 'dimension' | 'color' | 'weight' | 'material';

export type SocialLinkType = 'instagram' | 'facebook' | 'website';

export type SocialLink = { type: SocialLinkType; url: string };

export type CmsSettings = { artistEmail: string; adminEmails: string[]; socialLinks: SocialLink[]; address?: LocalizedText; mapUrl?: string };

export type CategoryView = { id: string; name: LocalizedText; description?: LocalizedText; tags: string[]; children?: CategoryView[] };

export type ItemCharacteristics = Partial<Record<CharacteristicKey, string>>;

export type Item = {
  id: string;
  title: LocalizedText;
  description?: LocalizedText;
  price: number;
  tags: string[];
  available: boolean;
  characteristics?: ItemCharacteristics;
};

export type MarketDate = { date: string; location: LocalizedText; description?: LocalizedText; url?: string };

export type ContactContent = { bio: LocalizedText; categoriesOverview?: LocalizedText; markets: MarketDate[] };

export type LegalLinkKey = 'cgv' | 'cgu';

export type LegalLink = { key: LegalLinkKey; url: string };

export type CmsContent = {
  settings: CmsSettings;
  categories: CategoryView[];
  items: Item[];
  featuredCategoryIds: string[];
  featuredItemIds: string[];
  tags?: string[];
  contact: ContactContent;
  legalLinks: LegalLink[];
};
