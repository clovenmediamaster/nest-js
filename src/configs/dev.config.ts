import { Calc } from '../modules/calculator/calculator.entity';

export const MysqlConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '111111',
  database: 'calc',
  entities: [Calc],
  synchronize: true,
  autoLoadEntities: true,
};
