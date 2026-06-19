import { Link } from 'react-router';
import { Button } from '../../common/Button';
import { homeUrl } from '../../routes/routePaths';

export function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-heading" className="text-center">
      <h1 id="not-found-heading" className="text-3xl font-semibold text-gray-900">
        Page not found
      </h1>
      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <div className="mt-6">
        <Link to={homeUrl()}>
          <Button>Back to home</Button>
        </Link>
      </div>
    </section>
  );
}
