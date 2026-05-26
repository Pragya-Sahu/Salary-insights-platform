require 'rails_helper'

RSpec.describe Employee, type: :model do
  subject(:employee) { build (:employee) }

  describe 'validations' do
    it 'is valid with attributes' do
      expect(employee).to be_valid
    end

    it 'is invalid without full_name' do
      employee.full_name = nil
      expect(employee).not_to be_valid
    end

    it 'is invalid without salary' do
      employee.salary = nil
      expect(employee).not_to be_valid
    end

    it 'is invalid with negative salary' do
      employee.salary = -10000
      expect(employee).not_to be_valid
    end
  end
end
