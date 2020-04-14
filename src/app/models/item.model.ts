/*Unlike classes, interfaces are completely removed during compilation
and so they will not add any unnecessary bloat to our final JavaScript code.*/
export interface Item {
  id: number; // unique item identifier
  name: string; // to-do item name
  description: string; // to-do item description
}

export class ItemEntity implements Item {
  id: number = 0;
  name: string = '';
  description: string = '';

  constructor(model?) {
    if (model) {
      for (let key in model) {
        this[key] = model[key];
      }
    }
  }
}
