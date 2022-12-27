import { isBatchestable } from "./bat-chest-logic"

describe("Batchest module logic", () => {
  test("Sends batchest when it sees 'I heckin love'", () => {
    expect(isBatchestable("i heckin love pob")).toBe(true)
    expect(isBatchestable("I HECKIN LOVE POB")).toBe(true)
    expect(isBatchestable("i HeCkIn LoVe PoB")).toBe(true)
  })
  test("It doesn't send when it isn't batchastable", () => {
    expect(isBatchestable("")).toBe(false)
    expect(isBatchestable("I LOVE POB")).toBe(false)
    expect(isBatchestable("i love pob")).toBe(false)
    expect(isBatchestable("i heckin like pob")).toBe(false)
  })
})
