import { LightningElement } from "lwc";

export default class RestTest extends LightningElement {
  randomJoke;
  connectedCallback() {
    const calloutURL = "https://icanhazdadjoke.com";
    fetch(calloutURL, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((responseJSON) => {
        this.randomJoke = responseJSON.joke;
      });
  }
}
