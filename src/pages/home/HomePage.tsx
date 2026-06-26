import 'swiper/css';
import 'swiper/css/navigation';
import { FeaturedCategories } from './FeaturedCategories';
import { FeaturedItems } from './FeaturedItems';
import { ContactSection } from './ContactSection';
import { Banner } from './Banner';

export function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <Banner />
      <FeaturedCategories />
      <FeaturedItems />
      <ContactSection />
    </div>
  );
}
