import {AdEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?: string;
}

export class AdRecord implements AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;

    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length > 100){
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków')
        }

        if(obj.description.length > 1000){
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków')
        }

        if(obj.price < 0 ||  obj.price > 9999999){
            throw new ValidationError('Proszę podać cenę z zakresu 0 - 9 999 999')
        }

        if(!obj.name || obj.name.length > 100){
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków')
        }

        // @TODO: Check if URL is valid!

        if(!obj.url || obj.url.length > 100){
            throw new ValidationError('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków')
        }

        if(typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia')
        }
    }
}