import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Home from "../components/home";

describe("Home", () => {
  beforeEach(() => {
    render(
      <Router>
        <Home />
      </Router>
    );
  });

  it("Shows link text to Launches ", () => {
    const linkToLaunchesText = screen.getByText("Browse SpaceX Launches");
    expect(linkToLaunchesText).toBeInTheDocument();
  });
  it("Shows link to LaunchPads ", () => {
    const linkToLaunchPadsText = screen.getByText("Browse SpaceX Launch Pads");
    expect(linkToLaunchPadsText).toBeInTheDocument();
  });
  it("Shows link to Dragons ", () => {
    const linkToDragons = screen.getByText("Browse SpaceX Dragons");
    expect(linkToDragons).toBeInTheDocument();
  });
});
