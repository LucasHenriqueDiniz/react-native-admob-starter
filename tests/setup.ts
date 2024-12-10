import * as ReactNative from "react-native"
import mockFile from "./mockFile"

// Mock o SettingsManager antes do react-native
jest.mock("react-native/Libraries/Settings/Settings", () => ({
  get: jest.fn(),
  set: jest.fn(),
  watchKeys: jest.fn(),
  clearWatch: jest.fn(),
}))

// Mock react-native
jest.doMock("react-native", () => ({
  ...ReactNative,
  Image: {
    ...ReactNative.Image,
    resolveAssetSource: () => mockFile,
    getSize: (uri: string, success: (width: number, height: number) => void) => success(100, 100),
  },
  Dimensions: {
    ...ReactNative.Dimensions,
    get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  },
  Settings: {
    get: jest.fn(),
    set: jest.fn(),
    watchKeys: jest.fn(),
    clearWatch: jest.fn(),
  },
}))

// Outros mocks
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
}))

jest.mock("i18next", () => ({
  t: (key: string) => key,
  use: () => ({ init: () => Promise.resolve() }),
}))

jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US", textDirection: "ltr" }],
}))
