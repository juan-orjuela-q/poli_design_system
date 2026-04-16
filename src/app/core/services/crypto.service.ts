import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CryptoService {
 constructor() { }

  encryptPass(password: string): string {
    return CryptoJS.AES.encrypt(password, environment.encryptionKey).toString();
  }

  decryptPass(passwordToDecrypt: string) {
      return CryptoJS.AES.decrypt(passwordToDecrypt, environment.encryptionKey).toString(CryptoJS.enc.Utf8);
  }

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, environment.encryptionKey).toString();
  }

  decrypt(data: string) {
    if (data) {
      const response = CryptoJS.AES.decrypt(data, environment.encryptionKey).toString(CryptoJS.enc.Utf8)
      return JSON.parse(response);
    }
    return null;
  }

  encrypt256(data: string): string {
    return CryptoJS.SHA256(data).toString();
  }
}
