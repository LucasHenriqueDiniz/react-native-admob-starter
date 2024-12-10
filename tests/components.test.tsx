import { render } from "@testing-library/react-native"
import { Button } from "components/Button"
import { Text } from "react-native"

describe("Basic Components", () => {
  it("renders Button with text", () => {
    const { getByText } = render(
      <Button onPress={() => {}}>
        <Text>Test Button</Text>
      </Button>,
    )

    expect(getByText("Test Button")).toBeTruthy()
  })
})
