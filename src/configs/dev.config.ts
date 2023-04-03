import { Calc } from '../modules/calculator/calculator.entity';
import { User } from 'src/modules/user/user.entity';

export const MysqlConfig = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'calc',
  entities: [Calc, User],
  synchronize: true,
  autoLoadEntities: true,
};
