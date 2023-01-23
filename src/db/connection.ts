import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bwoman', 'admin', 'Loras,22.', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;
