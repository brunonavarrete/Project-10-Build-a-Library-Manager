'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    book_id: DataTypes.INTEGER,
    patron_id: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: '"Patron ID" is required'
        }
      }
    },
    loaned_on: {
      type:DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: '"Loaned on" is required'
        }
      }
    },
    return_by: {
      type:DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: '"Return by" is required'
        }
      }
    },
    returned_on: DataTypes.DATE
  }, {
    timestamps:false,
    underscored:true
  },{
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Loan;
};