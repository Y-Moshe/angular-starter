import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { storageService } from '@/services'
import { ILoginResponse, IAuthToken, IUser } from '@/types'
import { environment } from '../../environments/environment'

const STORAGE_KEY = 'authToken'
const API_URL = environment.apiUrl + '/auth'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpService: HttpClient) {}

  public signup(user: IUser): Observable<ILoginResponse> {
    return this.httpService.post<ILoginResponse>(`${API_URL}/signup`, user)
  }

  public login(email: string, password: string): Observable<ILoginResponse> {
    return this.httpService.post<ILoginResponse>(`${API_URL}/login`, {
      email,
      password,
    })
  }

  public logout(): Observable<any> {
    return this.httpService.post<void>(`${API_URL}/logout`, {})
  }

  public verifyToken(token: string): Observable<IAuthToken> {
    return this.httpService.post<IAuthToken>(`${API_URL}/verify/token`, {
      token,
    })
  }

  public saveAuthToken(token: string): void {
    storageService.saveToStorage(STORAGE_KEY, token)
  }

  public loadAuthToken(): string | null {
    return storageService.loadFromStorage<string>(STORAGE_KEY)
  }

  public clearAuthToken(): void {
    storageService.removeFromStorage(STORAGE_KEY)
  }
}
