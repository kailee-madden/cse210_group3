// Button at the top-right corner of the webpage

class LandingButton extends HTMLButtonElement {
  constructor () {
    super()
    this.addEventListener('click', () => {
      window.location.href = '../../index.html'
    })
  }

  connectedCallback () {
    this.classList.add('btn', 'btn-primary', 'btn-lg', 'm-3', 'p-3')
    this.style.width = '85%'
    this.style.alignSelf = 'center'
    this.style.transition = 'all 100ms ease-in-out'
    this.style.color = 'white'
    this.style.fontWeight = 'bold'
    this.style.fontSize = 'x-large'
    this.style.border = '1px solid var(--bs-dark)'
    this.style.fontFamily = 'Indie Flower'
  }
}

customElements.define('landing-button', LandingButton, { extends: 'button' })
