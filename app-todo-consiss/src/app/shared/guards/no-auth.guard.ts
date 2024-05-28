import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
// import { AuthService } from "../services/auth.service";
import { Storage } from "@ionic/storage-angular";

export const NoAuthGuard: CanActivateFn = async (route, state) => {
  // const authService = inject(AuthService);
  const router = inject(Router);
  const storage = inject(Storage);
  // manuel
  const loggedIn = await storage.get('user');
  if (loggedIn) {
    router.navigate(['/home']);
  }
  return loggedIn;
}