import { frontendConfig } from '../config';

export const App = () => {
  return (
    <div>
      <h1>{frontendConfig.appTitle}</h1>
      <p>Version: {frontendConfig.version}</p>
      {/* API calls would use frontendConfig.apiUrl */}
    </div>
  );
}; 