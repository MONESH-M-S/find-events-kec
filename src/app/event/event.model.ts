export interface Event {
  _id?: string;
  name?: string;
  venue?: string;
  mode?: string;
  registrationStart?: string;
  registrationEnd?: string;
  eventDate?: string;
  organisation?: string;
  events?: string[], 
  creator?: string;
  description?: string;
  image?: string;
}
