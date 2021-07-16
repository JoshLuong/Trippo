import qs from 'qs';
import HttpService from '.';

export default class ItineraryService {
  static list(params: any) {
    return HttpService.get(`/api/itineraries?${qs.stringify(params)}`);
  }

  static create(data: any) {
    return HttpService.post('/api/itineraries', data);
  }

  static get(id: string) {
    return HttpService.get(`/api/itineraries/${id}`);
  }

  static update(id: string, data: any) {
    return HttpService.patch(`/api/itineraries/${id}`, data);
  }

  static delete(id: string) {
    return HttpService.delete(`/api/itineraries/${id}`);
  }
}
