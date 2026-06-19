import { useParams } from 'react-router';

export function ItemPage() {
  const { id } = useParams();

  return (
    <section aria-labelledby="item-heading">
      <h1 id="item-heading" className="text-3xl font-semibold text-gray-900">
        Item
      </h1>
      <p className="mt-2 text-gray-600">Item ID: {id}</p>
    </section>
  );
}
