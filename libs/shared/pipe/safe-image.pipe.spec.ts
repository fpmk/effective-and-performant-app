import { SafePosterImagePipe } from './safe-image.pipe';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafeImagePipe', () => {
  let pipe: SafePosterImagePipe;
  let sanitizerMock = {
    sanitize: jest.fn(),
  };

  beforeAll(async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DomSanitizer, useValue: sanitizerMock },
        SafePosterImagePipe
      ]
    });
    pipe = TestBed.inject(SafePosterImagePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return default poster', () => {
    let poster = pipe.transform('');
    expect(poster).toBe(
      'data:image/webp;base64,UklGRrwBAABXRUJQVlA4ILABAADQGACdASrhAOEAPpFIoUwlpCMiIzOoCLASCWlu4XEV7mK89PFAOtoKCK8z0BGXXnBPU0b0MVIjSh0X/J6AjLvYjIf/0BGYwILipnoCNP0j0Jfe4nVoSFDocfUfXSO9mhA8xOUAATqmH/gBLgRqRAFpU+H/FyXEwiAuvC6QYHuunnBoV3b6KE+KrBtQLkhlpCFiSbQVUzsXG018Y0k209VYuZVsylHpGQ//oCMxgQXFTPQEafogH3ZITNjFsEuQ2I9FIAtutzPQEZddN3W5lAAA/v5aAs3CtU0g35l0cZQawxJH73VRXdJABf8sD/zSLIZ/hyfWHnRlPEOt7e+54yhZHt6js3RwOik4Kxtn3AhSX8K17/C1tkg7orpoYw6ahRh1WLltwJVZ/Li+qKRooWz5K9lkfvrEWeMxhobC7bMJlQRowXnfv1JdmZfXqDxnxUQBVM6+j5wblJ6fSrvIwrXwkdAuTSy9/dk/e39Lh+PVLYuaMzzinccnuZg1qflwuYHrMDizL5ITxg3iQffNNk1M1+yRg+OKb08DIeeOV40aOYjhwawBvH8EAAAAAAAAAAA=');
  });

  it('should return poster', () => {
    let posterUrl = '/assets/poster.webp';
    jest.spyOn(sanitizerMock, 'sanitize').mockReturnValue(posterUrl);
    let poster = pipe.transform(posterUrl);
    expect(poster).toBe(posterUrl);
  });
});
