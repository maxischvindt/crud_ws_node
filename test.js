const { Selector } = require("testcafe");

fixture`Getting Started`.page`https://crud-ws-node.herokuapp.com/`;

//Create account
test("Create account", async (t) => {
  await t
    .typeText("#account-email", "userxyz85@gmail.com")
    .click("#submit-button")
    .expect(
      Selector(".list-div-email").withText("userxyz85@gmail.com").innerText
    )
    .eql("userxyz85@gmail.com");
});

test("Update account", async (t) => {
  await t
    .typeText("#account-email", "userxyz85_Edit@gmail.com")
    .click(
      Selector("button").withAttribute("edit-account", "userxyz85@gmail.com")
    )
    .expect(
      Selector(".list-div-email").withText("userxyz85_Edit@gmail.com").innerText
    )
    .eql("userxyz85_Edit@gmail.com");
});

test("Delete account", async (t) => {
  await t
    .click(
      Selector("button").withAttribute(
        "delete-account",
        "userxyz85_Edit@gmail.com"
      )
    )
    .expect(
      Selector(".list-div-email").withText("userxyz85_Edit@gmail.com").exists
    )
    .notOk();
});
