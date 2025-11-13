import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CastMember } from '@domain/show/entity';
import { SafePosterImagePipe } from '@shared/pipe';

@Component({
  selector: 'app-cast-member',
  imports: [
    SafePosterImagePipe
  ],
  templateUrl: './cast-member.component.html',
  styleUrl: './cast-member.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CastMemberComponent {
  member = input.required<CastMember>();
}
