class VolunteerItem {
  constructor(id, ownerId, title, imageUrl, description, location, time) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.location = location;
    this.time = time;
  }
}

export default VolunteerItem;
