export class PlacesService {
  private places: { location: string }[] = [
    {location: '人民广场'},
    {location: '环球港'},
    {location: '圣诺亚酒店'},
    {location: '梅赛德斯奔驰中心'},
    {location: '上海国际会展中心'},
  ];

  addPlace(place: { location: string }) {
    this.places.push(place);
  }

  getPlaces() {
    return this.places.slice();
  }
}
