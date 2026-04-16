import { fn } from "storybook/test";
import { expect } from "storybook/test";

import { Button } from "@pg/button";
import { squared } from "@pg/utils";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    primary: true,
    label: "Button",
  },
};

let spyVal = 0;
let spyFn = fn(() => {
  spyVal = squared(77);
});
export const ButtonFunction = {
  args: {
    label: "Test Squared Fn",
    onClick: spyFn,
  },
  async beforeEach() {
    spyVal = 0;
  },
  play: async ({ canvas, userEvent, step }) => {
    let $btn = await canvas.findByRole("button", { name: "Test Squared Fn" });
    await step("one", async () => {
      await expect(spyVal).toEqual(0);
      await expect($btn).toBeVisible();
    });
    await step("two", async () => {
      await userEvent.click($btn);
      await expect(spyFn).toHaveBeenCalled();
      await expect(spyVal).toEqual(5929);
    });
  },
};
