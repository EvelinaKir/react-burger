import "@4tw/cypress-drag-drop";
describe("button to make the order works currectly", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it(`should open main page at first`, () => {
    cy.contains("Соберите бургер");
  });

  it(`should redirect unAuthed user if he or she tries to make an order`, () => {
    cy.get("div").contains("Оформить заказ").click();
    cy.contains("Вы — новый пользователь?");
  });

  it("should auth and be redirected back to main page", () => {
    cy.get("div").contains("E-mail").type("qwerty098@mail.ru");
    cy.get("div").contains("Пароль").type("kortosh");
    cy.get("button").contains("Войти").click();
    cy.contains("Соберите бургер");
  });

  it(`should warn by modal if user tries to make an order without buns`, () => {
    cy.contains("Добавьте булку");
    cy.get("button").contains("Оформить заказ").click();
    cy.contains("Ошибка!");
  });
  it(`should close error on X`, () => {
    cy.get('[alt="escape button"]').click()
    cy.contains("Соберите бургер");
  });

  it (`should make an order with bun`, () => {
    cy.get("div")
    .contains("Флюоресцентная булка R2-D3")
    .drag(".BurgerConstructor_allIngredients__2UC0L");
  cy.get(".constructor-element__text").should(
    "contain",
    "Флюоресцентная булка R2-D3"
  );
  cy.get("button").contains("Оформить заказ").click();
  cy.get('.ModalStyles_modalBody__1uaMU').should('contain', 'идентификатор заказа')
  })

  it(`should close modal on X`, () => {
    cy.get('[alt="escape button"]').click()
    cy.contains("Соберите бургер");
  });
});
