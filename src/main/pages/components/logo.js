/* eslint-disable no-useless-constructor */
// Logo at the top-left corner of the webpage

class Logo extends HTMLElement {
  constructor () {
    // Always call super first in constructor
    super()
  }

  connectedCallback () {
    this.innerHTML = `
      <style>
        .heading {
          font-family: "Indie Flower";
          display: flex;
          align-self: center;
          text-align: right;
          font-size: 3.2vw;
          text-shadow: 2px 2px var(--bs-success);
        }
      </style>
      <h1 class="heading display-3 m-4" >
        Diversity<br/>Travel
      </h1>
    `
  }
}

// Register the component so it can be used as <logo-component></logo-component>
customElements.define('logo-component', Logo)
