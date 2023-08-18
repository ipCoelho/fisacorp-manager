import PrivateRoutes from './private';
import PublicRoutes from './public';

function Routes() {
  const token = localStorage.getItem('token');

  return <>{token ? <PrivateRoutes /> : <PublicRoutes />}</>;
}

export default Routes;
