import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {


  /**
   * createDb - prepopulates the DB with initial items
   *
   */
  createDb() {
    const items = [
      { id: 11, name: 'Buy food', description: 'eggs, milk, bread' },
      { id: 12, name: 'Go to the gym', description: 'at 20h' },
      { id: 13, name: 'Book the concert tickets', description: 'from tiiketi.fi' },
      { id: 14, name: 'Call parents', description: 'ask mom about the cooking recipe' },
      { id: 15, name: 'Do the homework', description: 'math, english' },
      { id: 16, name: 'Do the laundry', description: 'at 15h' },
      { id: 17, name: 'Pay the bills', description: 'rent, Netflix subscription' }
    ];
    return {items};
  }
}
