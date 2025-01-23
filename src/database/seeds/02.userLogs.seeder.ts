import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserLogsEntity } from 'src/modules/userLogs/entity/userLogs.entity';

export default class MoviesTranslationsSeeder implements Seeder {
  track = false;

  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(UserLogsEntity);
    await repository.insert([
      {
        nameOfSurgery: '흉부 수술',
        surgeryRecord: '흉부 수술을 받았습니다.',
        user: { idx: 1 },
      },
    ]);
  }
}
