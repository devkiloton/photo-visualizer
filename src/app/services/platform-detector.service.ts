import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatformDetectorService {

  platformId = inject(PLATFORM_ID)

  isPlatformBrowser(): boolean {
    return isPlatformBrowser(this.platformId)
  }
}
