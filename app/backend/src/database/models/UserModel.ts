import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class UsersModel extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

UsersModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(45),
    allowNull: false,
  },
  role: {
    type: STRING(45),
    allowNull: false,
  },
  email: {
    type: STRING(100),
    allowNull: false,
  },
  password: {
    type: STRING(100),
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default UsersModel;
