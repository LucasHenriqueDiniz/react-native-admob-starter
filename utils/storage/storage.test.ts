import AsyncStorage from "@react-native-async-storage/async-storage"
import { load, loadString, save, saveString, clear, remove, getAllKeys } from "./storage"

const VALUE_OBJECT = { x: 1 }
const VALUE_STRING = JSON.stringify(VALUE_OBJECT)

describe("AsyncStorage", () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    await AsyncStorage.setItem("string", "string")
    await AsyncStorage.setItem("object", JSON.stringify(VALUE_OBJECT))
  })

  it("should load a string", async () => {
    expect(await loadString("string")).toBe("string")
    expect(await loadString("object")).toBe(VALUE_STRING)
    expect(await loadString("invalid")).toBeNull()
  })

  it("should save a string", async () => {
    await saveString("new", "value")
    expect(await AsyncStorage.getItem("new")).toBe("value")
  })

  it("should load an object", async () => {
    expect(await load("object")).toEqual(VALUE_OBJECT)
    expect(await load("string")).toBe("string")
    expect(await load("invalid")).toBeNull()
  })

  it("should save an object", async () => {
    await save("new", VALUE_OBJECT)
    expect(await AsyncStorage.getItem("new")).toBe(VALUE_STRING)
  })

  it("should remove data", async () => {
    await remove("object")
    expect(await load("object")).toBeNull()
    expect(await AsyncStorage.getAllKeys()).toEqual(["string"])

    await remove("string")
    expect(await load("string")).toBeNull()
    expect(await AsyncStorage.getAllKeys()).toEqual([])
  })

  it("should clear all data", async () => {
    expect(await AsyncStorage.getAllKeys()).toEqual(["string", "object"])
    await clear()
    expect(await AsyncStorage.getAllKeys()).toEqual([])
  })

  it("should get all keys", async () => {
    expect(await getAllKeys()).toEqual(["string", "object"])
  })
})
