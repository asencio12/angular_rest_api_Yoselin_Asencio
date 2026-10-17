import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeService } from '../../core/services/theme.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly theme = inject(ThemeService);

  protected readonly items: NavItem[] = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'Digimon', path: '/digimon', icon: 'smart_toy' },
    { label: 'Dragon Ball Z', path: '/dragon-ball', icon: 'bolt' },
    { label: 'Pokémon', path: '/pokemon', icon: 'catching_pokemon' },
    { label: 'Demon Slayer', path: '/demon-slayer', icon: 'local_fire_department' },
  ];
}