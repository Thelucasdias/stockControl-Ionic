import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class NewUserPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
