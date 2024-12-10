import AsyncStorage from "@react-native-async-storage/async-storage"
import { load, save, clear } from "./storage"

describe("Storage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should save and load data", async () => {
    const testData = { test: "value" }

    await save("testKey", testData)
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("testKey", JSON.stringify(testData))

    jest.spyOn(AsyncStorage, "getItem").mockResolvedValueOnce(JSON.stringify(testData))
    const loaded = await load("testKey")
    expect(loaded).toEqual(testData)
  })

  it("should clear storage", async () => {
    await clear()
    expect(AsyncStorage.clear).toHaveBeenCalled()
  })
})
