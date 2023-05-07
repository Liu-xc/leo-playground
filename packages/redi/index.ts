import { Inject, Injector } from '@wendellhu/redi'
class AuthService {
  public getCurrentUserInfo() {
    // your implementation here...
  }
}
class FileListService {
  constructor(@Inject(AuthService) private readonly authService: AuthService) { }
  public getUserFiles() {
    const currentUser = this.authService.getCurrentUserInfo()
    // ...
  }
}

const injector = new Injector([[AuthService], [FileListService]]);

const svc = injector.get(FileListService);

console.log(svc)