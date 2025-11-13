import { inject, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safePosterImage'
})
export class SafePosterImagePipe implements PipeTransform {
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _emptyImage = 'data:image/webp;base64,UklGRrwBAABXRUJQVlA4ILABAADQGACdASrhAOEAPpFIoUwlpCMiIzOoCLASCWlu4XEV7mK89PFAOtoKCK8z0BGXXnBPU0b0MVIjSh0X/J6AjLvYjIf/0BGYwILipnoCNP0j0Jfe4nVoSFDocfUfXSO9mhA8xOUAATqmH/gBLgRqRAFpU+H/FyXEwiAuvC6QYHuunnBoV3b6KE+KrBtQLkhlpCFiSbQVUzsXG018Y0k209VYuZVsylHpGQ//oCMxgQXFTPQEafogH3ZITNjFsEuQ2I9FIAtutzPQEZddN3W5lAAA/v5aAs3CtU0g35l0cZQawxJH73VRXdJABf8sD/zSLIZ/hyfWHnRlPEOt7e+54yhZHt6js3RwOik4Kxtn3AhSX8K17/C1tkg7orpoYw6ahRh1WLltwJVZ/Li+qKRooWz5K9lkfvrEWeMxhobC7bMJlQRowXnfv1JdmZfXqDxnxUQBVM6+j5wblJ6fSrvIwrXwkdAuTSy9/dk/e39Lh+PVLYuaMzzinccnuZg1qflwuYHrMDizL5ITxg3iQffNNk1M1+yRg+OKb08DIeeOV40aOYjhwawBvH8EAAAAAAAAAAA=';

  transform(value: string): string {
    if (!value) return this._emptyImage;
    return this._sanitizer.sanitize(SecurityContext.URL, value) || this._emptyImage;
  }

}
