import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter, Greeting, AlertButton } from "./Latihan";
import "@testing-library/jest-dom";

describe("Comprehensive Component Tests", () => {
  describe("Counter Component Tests", () => {
    test("Initial value of the counter is 0", () => {
      render(<Counter />);
      const counterDisplay = screen.getByTestId("counter-value");
      expect(counterDisplay).toHaveTextContent("0");
    });

    test("Increment button increases counter value by 1", () => {
      render(<Counter />);
      const incrementButton = screen.getByTestId("increment-button");
      const counterDisplay = screen.getByTestId("counter-value");

      fireEvent.click(incrementButton);
      expect(counterDisplay).toHaveTextContent("1");
    });

    test("Decrement button decreases counter value by 1", () => {
      render(<Counter />);
      const decrementButton = screen.getByTestId("decrement-button");
      const counterDisplay = screen.getByTestId("counter-value");

      fireEvent.click(decrementButton);
      expect(counterDisplay).toHaveTextContent("-1");
    });

    test("Reset button resets the counter value to 0", () => {
      render(<Counter />);
      const incrementButton = screen.getByTestId("increment-button");
      const resetButton = screen.getByTestId("reset-button");
      const counterDisplay = screen.getByTestId("counter-value");

      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(resetButton);
      expect(counterDisplay).toHaveTextContent("0");
    });

    test("Counter supports negative values", () => {
      render(<Counter />);
      const decrementButton = screen.getByTestId("decrement-button");
      const counterDisplay = screen.getByTestId("counter-value");

      fireEvent.click(decrementButton);
      fireEvent.click(decrementButton);
      expect(counterDisplay).toHaveTextContent("-2");
    });

    test("Counter can increment and decrement sequentially", () => {
      render(<Counter />);
      const incrementButton = screen.getByTestId("increment-button");
      const decrementButton = screen.getByTestId("decrement-button");
      const counterDisplay = screen.getByTestId("counter-value");

      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(decrementButton);
      expect(counterDisplay).toHaveTextContent("1");
    });

    test("Reset button works after decrementing", () => {
      render(<Counter />);
      const decrementButton = screen.getByTestId("decrement-button");
      const resetButton = screen.getByTestId("reset-button");
      const counterDisplay = screen.getByTestId("counter-value");

      fireEvent.click(decrementButton);
      fireEvent.click(resetButton);
      expect(counterDisplay).toHaveTextContent("0");
    });
  });

  describe("Greeting Component Tests", () => {
    test("Renders a greeting for a student name", () => {
      render(<Greeting name="Heltrizulfikar" />);
      const greetingMessage = screen.getByTestId("greeting");
      expect(greetingMessage).toHaveTextContent("Hai heltrizulfikar");
    });

    test("Renders a default greeting for a lecturer", () => {
      render(<Greeting name="Bosku" />);
      const greetingMessage = screen.getByTestId("greeting");
      expect(greetingMessage).toHaveTextContent("Hai karyawan");
    });

    test("Displays default greeting when no name is provided", () => {
      render(<Greeting />);
      const greetingMessage = screen.getByTestId("greeting");
      expect(greetingMessage).toHaveTextContent("Hai pengguna");
    });
  });

  describe("AlertButton Component Tests", () => {
    test("Triggers alert with a given message", () => {
      const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

      render(<AlertButton message="Selamat tinggal!" />);
      const alertButton = screen.getByTestId("alert-button");

      fireEvent.click(alertButton);
      expect(alertMock).toHaveBeenCalledWith("Selamat tinggal!");

      alertMock.mockRestore();
    });

    test("Displays no alert when no message is provided", () => {
      const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

      render(<AlertButton />);
      const alertButton = screen.getByTestId("alert-button");

      fireEvent.click(alertButton);
      expect(alertMock).toHaveBeenCalledWith("");

      alertMock.mockRestore();
    });

    test("Clicking alert button works multiple times", () => {
      const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

      render(<AlertButton message="Klik lagi!" />);
      const alertButton = screen.getByTestId("alert-button");

      fireEvent.click(alertButton);
      fireEvent.click(alertButton);
      expect(alertMock).toHaveBeenCalledTimes(2);

      alertMock.mockRestore();
    });

    test("Alert button changes style after being clicked", () => {
      render(<AlertButton message="Coba klik!" />);
      const alertButton = screen.getByTestId("alert-button");

      fireEvent.click(alertButton);
      expect(alertButton).toHaveClass("clicked");
    });
  });
});
