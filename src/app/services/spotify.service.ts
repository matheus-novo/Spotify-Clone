import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environment.prod';
import Spotify from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  obterUrlLogin() {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterToken() {
    /* o window.location.hash pega tudo aquilo depois da # na URL
    e o split('&') divide em um array de strings, separados pelo &
    Depois eu pego o primeiro item o array e faço um novo split, pra limpar
    tudo e deixar só o token
    */

    if(!window.location.hash)
      return '';

    const paramsUrl = window.location.hash.split('&');
    const token = paramsUrl[0].split('=')[1];
    return token;
  }

  definirAccessToken(token:string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem("token", token);
  }
}
