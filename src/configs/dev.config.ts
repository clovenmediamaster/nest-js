import { Calc } from '../modules/calculator/calculator.entity';

export const MysqlConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'my-secret-pw',
  database: 'calc',
  entities: [Calc],
  synchronize: true,
  autoLoadEntities: true,
};
