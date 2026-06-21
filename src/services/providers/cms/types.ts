export type LocalizedText = { fr: string; en?: string };

export type SocialLinkType = 'instagram' | 'facebook' | 'website';

export type SocialLink = { type: SocialLinkType; url: string };

export type CmsSettings = { artistEmail: string; adminEmails: string[]; socialLinks: SocialLink[]; address?: LocalizedText; mapUrl?: string };

export type CategoryView = { id: string; name: LocalizedText; description?: LocalizedText; tags: string[]; children?: CategoryView[] };

export type ItemCharacteristics = { dimension?: string; colors?: string[]; weight?: number; material?: string };

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
  tags: Record<string, LocalizedText>;
  colors: Record<string, LocalizedText>;
  contact: ContactContent;
  legalLinks: LegalLink[];
};
