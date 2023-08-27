import { IPageInterface } from './../interfaces/pageInterface';
import { ICar } from './../interfaces/carInterface';
import { IPagination } from './../interfaces/paginationInterface';
import { IRes, apiService } from "./apiService";
import { urls } from "../constants";

const config = {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
     
      // Додайте сюди необхідні заголовки аутентифікації, наприклад, токен або інше
    },
  };

const carService = {
    getAll: (activePage:number): IRes<IPageInterface<ICar>> => apiService.get(`${urls.cars.base}?page=${activePage}&page_size=6`),
    getPages:():IRes<IPagination<ICar>> => apiService.get(urls.cars.base),
    create: (data: ICar): IRes<ICar> => apiService.post(urls.cars.base, data),
    getById: (id: number): IRes<ICar> => apiService.get(urls.cars.byId(id)),
    update: (id: number, data: ICar): IRes<ICar> => apiService.put(urls.cars.byId(id), data),
    delete: (id: number): IRes<void> => apiService.delete(urls.cars.byId(id)),
    addPhoto: (id:number, photo:FormData):IRes<void>=>apiService.put(urls.cars.photo(id),photo, config)
   // addPhoto: (id:number,formData:string):IRes<void>=>apiService.put(urls.cars.photo(id), formData,config)
}

export { carService}

/*http://owu.linkpc.net/carsAPI/v2/cars?page=2&page_size=2 */