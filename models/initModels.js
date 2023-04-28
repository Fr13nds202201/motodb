const Repairs = require('./repairs.models');
const User = require('./users.models');

//user puede tener varios servicios y un servicio le pertenece a un usuario.
const initModel = () => {
    User.hasMany(Repairs, { foreignKey: 'userId' });
    Repairs.belongsTo(User, { foreignKey: 'id' });
}
module.exports = initModel;