'use strict';
module.exports = function(sequelize, DataTypes) {
  var Loan = sequelize.define('Loan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    book_id: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: '"Book ID" is required'
        }
      }
    },
    patron_id: {
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: '"Patron ID" is required'
        }
      }
    },
    loaned_on: {
      type:DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: '"Loaned on" is required'
        },
      }
    },
    return_by: {
      type:DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: '"Return by" is required'
        }
      }
    },
    returned_on: {
      type:DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          msg: '"Returned on" is required'
        }
      }
    }
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