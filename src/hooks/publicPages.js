import { useMatch } from "react-router-dom";

export const usePublicPages = () => {
  const isPublic = !!useMatch("/public/*");
  return isPublic;
};
