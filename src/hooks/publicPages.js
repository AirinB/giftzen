import { useMatch } from 'react-router-dom';

export const usePublicPages = () => {
  return !!useMatch('/public/*');
};
