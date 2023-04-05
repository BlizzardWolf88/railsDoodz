require "test_helper"

class DoodzsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @doodz = doodzs(:one)
  end

  test "should get index" do
    get doodzs_url
    assert_response :success
  end

  test "should get new" do
    get new_doodz_url
    assert_response :success
  end

  test "should create doodz" do
    assert_difference("Doodz.count") do
      post doodzs_url, params: { doodz: { EBaby_Twitter: @doodz.EBaby_Twitter, email: @doodz.email, first_name: @doodz.first_name, last_name: @doodz.last_name, phone: @doodz.phone, string: @doodz.string } }
    end

    assert_redirected_to doodz_url(Doodz.last)
  end

  test "should show doodz" do
    get doodz_url(@doodz)
    assert_response :success
  end

  test "should get edit" do
    get edit_doodz_url(@doodz)
    assert_response :success
  end

  test "should update doodz" do
    patch doodz_url(@doodz), params: { doodz: { EBaby_Twitter: @doodz.EBaby_Twitter, email: @doodz.email, first_name: @doodz.first_name, last_name: @doodz.last_name, phone: @doodz.phone, string: @doodz.string } }
    assert_redirected_to doodz_url(@doodz)
  end

  test "should destroy doodz" do
    assert_difference("Doodz.count", -1) do
      delete doodz_url(@doodz)
    end

    assert_redirected_to doodzs_url
  end
end
