import moment from 'moment';

class Commitment {
  constructor(id, items, date) {
    this.id = id;
    this.items = items;
    this.points = 30;
    this.date = date;
  }

  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Commitment;
