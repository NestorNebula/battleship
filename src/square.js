export class Square {
  constructor() {
    this.status = null;
    this.ship = null;
  }

  updateStatus(stat) {
    this.status = stat;
  }

  updateShip(id) {
    this.ship = id;
  }
}
