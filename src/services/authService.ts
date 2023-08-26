import { IUser } from './../interfaces/userInterface';
import { ITokens } from './../interfaces/tokensInterface';
import { urls } from "../constants";
import { IAuth } from "../interfaces";
import { IRes, apiService } from "./apiService";

const authService = {
    register: (user: IAuth): IRes<IAuth> => apiService.post(urls.auth.register, user),

    //при логіні відправляємо два запити на авторизацію і на отримання данних токенів з auth.me
    async login(user: IAuth): Promise<IUser> {
        const { data } = await apiService.post<ITokens>(urls.auth.login, user)
        this.setTokens(data)
        const { data: me } = await this.me();
        return me
    },

    async refresh(): Promise<void> {
        const refresh = this.getRefreshToken();
        const {data} = await apiService.post<ITokens>(urls.auth.refresh, {refresh});
        this.setTokens(data)
    },
    
    //тут лише отримання данних з авторизованого користувача, після оновлення сторінки і при наявності токена
    me(): IRes<IUser> {
        return apiService.get(urls.auth.me)
    },

    setTokens({ refresh, access }: ITokens): void {
        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)
    },
    getAccessToken(): string | null {
        return localStorage.getItem('access')
    },
    getRefreshToken(): string | null {
        return localStorage.getItem('refresh')
    },
    deleteTokens(): void {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
    }

}

export { authService }