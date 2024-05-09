import { Component } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {

  articleList: string[] = ['Article', 'Journal', 'Magazine', 'Newspaper']
  periodicalList: string[] = ['Periodical', 'Journal', 'Magazine', 'Newspaper']
selectedOption: any;
}
