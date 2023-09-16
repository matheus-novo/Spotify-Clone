import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    this.verificarTokenUrl();
    //console.log(this.spotifyService.obterToken());
  }

  verificarTokenUrl(){
    const token = this.spotifyService.obterToken();
    if(token != ''){
      this.spotifyService.definirAccessToken(token);
    }
    
  }

  constructor(private spotifyService: SpotifyService) {}

  abrirPaginaLogin() {
    window.location.href = this.spotifyService.obterUrlLogin();
  }
}
