const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sorting.sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });
    it("Should correctly sort array with duplicate names", () => {
    expect(sorting.sortByName([
      "Гарри Поттер",
      "Властелин Колец",
      "Гарри Поттер"
    ])).toEqual([
      "Властелин Колец",
      "Гарри Поттер",
      "Гарри Поттер"
    ]);
  });
  it("Should return empty array when input is empty", () => {
    expect(sorting.sortByName([])).toEqual([]);
  });
});