import { Component, OnInit, VERSION } from '@angular/core';
import { OnfidoService } from './onfido.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [OnfidoService],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  constructor(private service: OnfidoService) {}

  ngOnInit() {
    // const token = '';
    // this.service.open(token, () => {
    //   console.log('Great success!');
    // });
  }
}
