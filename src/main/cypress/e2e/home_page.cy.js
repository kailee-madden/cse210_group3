/* eslint-disable no-undef */
import { KvStoreDbService } from '../../js/data/service/kvStoreDbService'

function getDate (offset) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date.toISOString().split('T')[0]
}
describe('The Home Page', () => {
  const dbService = new KvStoreDbService()
  beforeEach(() => {
    // clear local storage before each test
    dbService.deleteAll('trips', 'trip_metadata')
  })

  it('successfully loads', () => {
    cy.visit('/', {
      onBeforeLoad (win) {
        // https://on.cypress.io/stub
        cy.stub(win.Notification, 'permission', 'granted')
        cy.stub(win, 'Notification').as('Notification')
      }
    })

    const input = [
      {
        name: 'Kawaguchi',
        start: getDate(1),
        end: getDate(2)
      },
      {
        name: 'Darwin',
        start: getDate(3),
        end: getDate(4)
      }
    ]

    for (let i = 0; i < input.length; i++) {
      cy.get('#newTrip').click()
      cy.get('#location')
        .type(input[i].name)
        .should('have.value', input[i].name)

      cy.wait(200)
      cy.get('#startDate')
        .type(input[i].start)
        .should('have.value', input[i].start)

      cy.wait(200)
      cy.get('#endDate')
        .type(input[i].end)
        .should('have.value', input[i].end)

      cy.get('#submit').click()

      cy.get('.card-body').contains(input[i].name)
    }
  })
})
