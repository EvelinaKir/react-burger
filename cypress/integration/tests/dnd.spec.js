import "@4tw/cypress-drag-drop";

describe("Verify the drag and drop test", function () {
  before(() => {
    cy.visit("http://localhost:3000");
  });
  describe("Dragtest", () => {
    it("should dragndrop bun", () => {
      cy.get("div")
        .contains("Флюоресцентная булка R2-D3")
        .drag(".BurgerConstructor_allIngredients__2UC0L");
      cy.get(".constructor-element__text").should(
        "contain",
        "Флюоресцентная булка R2-D3"
      );
      cy.get(".constructor-element__text").should(
        "not.contain",
        "Добавьте булку 🠗"
      );
    });
    it("should dragndrop ingredients", () => {
      cy.get("div")
        .contains("Соус фирменный Space Sauce")
        .drag(".BurgerConstructor_allIngredients__2UC0L");
        cy.get("div")
        .contains("Мясо бессмертных моллюсков Protostomia")
        .drag(".BurgerConstructor_allIngredients__2UC0L");
      cy.get("div")
        .contains("Соус Spicy-X")
        .drag(".BurgerConstructor_allIngredients__2UC0L");
      cy.get("div")
        .contains("Филе Люминесцентного тетраодонтимформа")
        .drag(".BurgerConstructor_allIngredients__2UC0L");
      cy.get(".constructor-element__text").should(
        "not.contain",
        " 🠖 Добавьте ингредиенты 🠔"
      );
    });

  });
});
