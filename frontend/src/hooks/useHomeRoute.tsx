import { useSession } from "../context/AuthenticationState";

export default function useHomeRoute(): string {
  const { session } = useSession();

  if (!session.isLoggedIn) {
    return "/login";
  }

  if (!session.user.neighborhoodId) {
    return "/neighborhood/find";
  }

  return "feed";
}
