require "test_helper"

class MadoodsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @madood = madoods(:one)
  end

  test "should get index" do
    get madoods_url
    assert_response :success
  end

  test "should get new" do
    get new_madood_url
    assert_response :success
  end

  test "should create madood" do
    assert_difference("Madood.count") do
      post madoods_url, params: { madood: {} }
    end

    assert_redirected_to madood_url(Madood.last)
  end

  test "should show madood" do
    get madood_url(@madood)
    assert_response :success
  end

  test "should get edit" do
    get edit_madood_url(@madood)
    assert_response :success
  end

  test "should update madood" do
    patch madood_url(@madood), params: { madood: {} }
    assert_redirected_to madood_url(@madood)
  end

  test "should destroy madood" do
    assert_difference("Madood.count", -1) do
      delete madood_url(@madood)
    end

    assert_redirected_to madoods_url
  end
end
