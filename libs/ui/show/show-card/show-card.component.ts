import { Component, input, output } from '@angular/core';
import { Show } from '@domain/show/entity';
import { SafePosterImagePipe } from '@shared/pipe';

@Component({
  selector: 'app-show-card',
  imports: [
    SafePosterImagePipe
  ],
  templateUrl: './show-card.component.html',
  styleUrl: './show-card.component.css'
})
export class ShowCardComponent {
  show = input.required<Show>();
  showCastMembersEvent = output<Show>();
}
