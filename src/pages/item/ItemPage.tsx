import { useParams } from 'react-router';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useCms } from '../../services/providers/cms/useCms';
import { ItemContent } from './ItemContent';
import { ItemPageError } from './ItemPageError';

export function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const { items } = useCms();
  const item = items.find(i => i.id === id);
  return item ? <ItemContent item={item} /> : <ItemPageError />;
}
