require "application_system_test_case"

class MadoodsTest < ApplicationSystemTestCase
  setup do
    @madood = madoods(:one)
  end

  test "visiting the index" do
    visit madoods_url
    assert_selector "h1", text: "Madoods"
  end

  test "should create madood" do
    visit madoods_url
    click_on "New madood"

    fill_in "Ebabys twitter", with: @madood.EBabys_Twitter
    fill_in "Email", with: @madood.email
    fill_in "First name", with: @madood.first_name
    fill_in "Last name", with: @madood.last_name
    fill_in "Phone", with: @madood.phone
    click_on "Create Madood"

    assert_text "Madood was successfully created"
    click_on "Back"
  end

  test "should update Madood" do
    visit madood_url(@madood)
    click_on "Edit this madood", match: :first

    fill_in "Ebabys twitter", with: @madood.EBabys_Twitter
    fill_in "Email", with: @madood.email
    fill_in "First name", with: @madood.first_name
    fill_in "Last name", with: @madood.last_name
    fill_in "Phone", with: @madood.phone
    click_on "Update Madood"

    assert_text "Madood was successfully updated"
    click_on "Back"
  end

  test "should destroy Madood" do
    visit madood_url(@madood)
    click_on "Destroy this madood", match: :first

    assert_text "Madood was successfully destroyed"
  end
end
