import { Component } from '@angular/core';
import { UNIVERSES } from '../../core/data/universes';
import { UniverseCard } from '../../shared/universe-card/universe-card';

@Component({
  selector: 'app-dashboard',
  imports: [UniverseCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly universes = UNIVERSES;
}