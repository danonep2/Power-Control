import path from "path";
import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(`./src/api/database`, 'db.sqlite'),
    logging: false
});


export default sequelize;
