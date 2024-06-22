import { Component } from '@angular/core';

@Component({
  selector: 'app-trivial',
  templateUrl: './trivial.component.html',
  styleUrls: ['./trivial.component.css']
})
export class TrivialComponent {

  card: string[] = ['curso', 'descripcion', 'ejemplo','curso', 'descripcion', 'ejemplo'];

  tarjetas = [
    { 
      title: 'CEH - CERTIFIED ETHICAL HACKER V12',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    { 
      title: 'CHFI - COMPUTER HACKING FORENSIC INVESTIGATOR V10',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    { 
      title: 'ECIH - CERTIFIED INCIDENT HANDLER V2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },{ 
      title: 'EHCA - Ethical Hacking Certified Associate',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
  ];

}
