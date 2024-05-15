import { Component } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {

  periodicalList: string[] = ['Periodical', 'Journal', 'Magazine', 'Newspaper']
selectedOption: any;
}
