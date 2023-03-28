import { Calc } from '../modules/calculator/calculator.entity';

export const MysqlConfig = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'calc',
  entities: [Calc],
  synchronize: true,
  autoLoadEntities: true,
};
