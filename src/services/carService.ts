import { ICar } from "../interfaces";
import { IRes, apiService } from "./apiService";
import { urls } from "../constants";

const carService = {
    getAll: (): IRes<ICar[]> => apiService.get(urls.cars.base),
    create: (data: ICar): IRes<ICar> => apiService.post(urls.cars.base, data),
    getById: (id: number): IRes<ICar> => apiService.get(urls.cars.byId(id)),
    update: (id: number, data: ICar): IRes<ICar> => apiService.put(urls.cars.byId(id), data),
    delete: (id: number): IRes<void> => apiService.delete(urls.cars.byId(id))
}

export { carService}