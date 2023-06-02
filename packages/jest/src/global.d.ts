import { SomeModule } from "./moduleB"

declare global {
  interface Window {
    results: Record<string, number>
    someModule: SomeModule;
  }
}

