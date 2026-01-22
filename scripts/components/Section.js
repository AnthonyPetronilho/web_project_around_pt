class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.array.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

  addItem() {
    this._container.append(element);
  }
}
