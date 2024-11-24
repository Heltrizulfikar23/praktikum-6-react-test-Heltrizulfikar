import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Counter, Greeting, AlertButton } from "./Latihan";
import "@testing-library/jest-dom";

describe("Component Testing Suite", () => {
  describe("Counter Component Behavior", () => {
    test("Starts at 0", () => {
      render(<Counter />);
      const counterValue = screen.getByTestId("counter-value");
      expect(counterValue).toHaveTextContent("0");
    });

    test("Increment button adds 1", () => {
      render(<Counter />);
      const incrementBtn = screen.getByTestId("increment-button");
      const counterValue = screen.getByTestId("counter-value");

      fireEvent.click(incrementBtn);
      expect(counterValue).toHaveTextContent("1");
    });

    test("Decrement button subtracts 1", () => {
      render(<Counter />);
      const decrementBtn = screen.getByTestId("decrement-button");
      const counterValue = screen.getByTestId("counter-value");

      fireEvent.click(decrementBtn);
      expect(counterValue).toHaveTextContent("-1");
    });

    test("Reset button resets to 0 after incrementing", () => {
      render(<Counter />);
      const incrementBtn = screen.getByTestId("increment-button");
      const resetBtn = screen.getByTestId("reset-button");
      const counterValue = screen.getByTestId("counter-value");

      fireEvent.click(incrementBtn);
      fireEvent.click(incrementBtn);
      fireEvent.click(resetBtn);
      expect(counterValue).toHaveTextContent("0");
    });

    test("Allows negative values when decrement button is clicked twice", () => {
      render(<Counter />);
      const decrementBtn = screen.getByTestId("decrement-button");
      const counterValue = screen.getByTestId("counter-value");

      fireEvent.click(decrementBtn);
      fireEvent.click(decrementBtn);
      expect(counterValue).toHaveTextContent("-2");
    });

    test("Handles increment and decrement in sequence", () => {
      render(<Counter />);
      const incrementBtn = screen.getByTestId("increment-button");
      const decrementBtn = screen.getByTestId("decrement-button");
      const counterValue = screen.getByTestId("counter-value");

      fireEvent.click(incrementBtn);
      fireEvent.click(incrementBtn);
      fireEvent.click(decrementBtn);
      expect(counterValue).toHaveTextContent("1");
    });

    test("Reset button works after decrementing", () => {
      render(<Counter />);
      const decrementBtn = screen.getByTestId("decrement-button");
      const resetBtn = screen.getByTestId("reset-button");
      const counterValue = screen.getByTestId("counter-value");

      fireEvent.click(decrementBtn);
      fireEvent.click(resetBtn);
      expect(counterValue).toHaveTextContent("0");
    });
  });

  describe("Greeting Component Behavior", () => {
    test("Shows a custom greeting for a given student name", () => {
      render(<Greeting name="Heltrizulfikar" />);
      const greetingText = screen.getByTestId("greeting");
      expect(greetingText).toHaveTextContent("Hai heltrizulfikar");
    });

    test("Displays default message for lecturer name", () => {
      render(<Greeting name="Bosku" />);
      const greetingText = screen.getByTestId("greeting");
      expect(greetingText).toHaveTextContent("Hai karyawan");
    });

    test("Fallback greeting message when no name is passed", () => {
      render(<Greeting />);
      const greetingText = screen.getByTestId("greeting");
      expect(greetingText).toHaveTextContent("Hai pengguna");
    });
  });

  describe("AlertButton Component Tests", () => {
    test("Displays an alert with the specified message", () => {
      const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

      render(<AlertButton message="Selamat tinggal!" />);
      const alertButton = screen.getByTestId("alert-button");

      fireEvent.click(alertButton);
      expect(alertSpy).toHaveBeenCalledWith("Selamat tinggal!");

      alertSpy.mockRestore();
    });

    test("Alert with empty message when none is passed", () => {
      const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

      render(<AlertButton />);
      const alertButton = screen.getByTestId("alert-button");

      fireEvent.click(alertButton);
      expect(alertSpy).toHaveBeenCalledWith("");

      alertSpy.mockRestore();
    });

    test("Alert button can be clicked multiple times", () => {
      const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

      render(<AlertButton message="Klik lagi!" />);
      const alertButton = screen.getByTestId("alert-button");

      fireEvent.click(alertButton);
      fireEvent.click(alertButton);
      expect(alertSpy).toHaveBeenCalledTimes(2);

      alertSpy.mockRestore();
    });

    test("Button changes style after a click", () => {
      render(<AlertButton message="Coba klik!" />);
      const alertButton = screen.getByTestId("alert-button");

      fireEvent.click(alertButton);
      expect(alertButton).toHaveClass("clicked");
    });

    test("Alert button retains functionality after multiple clicks", () => {
      const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

      render(<AlertButton message="Pesan aktif!" />);
      const alertButton = screen.getByTestId("alert-button");

      fireEvent.click(alertButton);
      fireEvent.click(alertButton);
      fireEvent.click(alertButton);
      expect(alertSpy).toHaveBeenCalledTimes(3);

      alertSpy.mockRestore();
    });
  });
});
