'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "userName", Sequelize.STRING);
  },

  async down (queryInterface, Sequelize) {
    
   return queryInterface.removeColumn("Users", "userName");
  }
};
