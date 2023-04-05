require "application_system_test_case"

class DoodzsTest < ApplicationSystemTestCase
  setup do
    @doodz = doodzs(:one)
  end

  test "visiting the index" do
    visit doodzs_url
    assert_selector "h1", text: "Doodzs"
  end

  test "should create doodz" do
    visit doodzs_url
    click_on "New doodz"

    fill_in "Ebaby twitter", with: @doodz.EBaby_Twitter
    fill_in "Email", with: @doodz.email
    fill_in "First name", with: @doodz.first_name
    fill_in "Last name", with: @doodz.last_name
    fill_in "Phone", with: @doodz.phone
    fill_in "String", with: @doodz.string
    click_on "Create Doodz"

    assert_text "Doodz was successfully created"
    click_on "Back"
  end

  test "should update Doodz" do
    visit doodz_url(@doodz)
    click_on "Edit this doodz", match: :first

    fill_in "Ebaby twitter", with: @doodz.EBaby_Twitter
    fill_in "Email", with: @doodz.email
    fill_in "First name", with: @doodz.first_name
    fill_in "Last name", with: @doodz.last_name
    fill_in "Phone", with: @doodz.phone
    fill_in "String", with: @doodz.string
    click_on "Update Doodz"

    assert_text "Doodz was successfully updated"
    click_on "Back"
  end

  test "should destroy Doodz" do
    visit doodz_url(@doodz)
    click_on "Destroy this doodz", match: :first

    assert_text "Doodz was successfully destroyed"
  end
end
