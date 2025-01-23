import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UsersEntity } from 'src/modules/users/entity/users.entity';

export default class MoviesSeeder implements Seeder {
  track = false;

  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(UsersEntity);
    await repository.insert([
      {
        patientId: '12345',
        name: '김철수',
        gender: 'male',
        dateOfBirth: '1990-01-01',
      },
      {
        patientId: '12346',
        name: '이영희',
        gender: 'female',
        dateOfBirth: '1992-02-02',
      },
      {
        patientId: '12347',
        name: '박민수',
        gender: 'male',
        dateOfBirth: '1985-03-03',
      },
      {
        patientId: '12348',
        name: '최수민',
        gender: 'female',
        dateOfBirth: '1988-04-04',
      },
      {
        patientId: '12349',
        name: '정지훈',
        gender: 'male',
        dateOfBirth: '1991-05-05',
      },
      {
        patientId: '12350',
        name: '한지민',
        gender: 'female',
        dateOfBirth: '1987-06-06',
      },
      {
        patientId: '12351',
        name: '오세훈',
        gender: 'male',
        dateOfBirth: '1993-07-07',
      },
      {
        patientId: '12352',
        name: '신혜수',
        gender: 'female',
        dateOfBirth: '1986-08-08',
      },
      {
        patientId: '12353',
        name: '유재석',
        gender: 'male',
        dateOfBirth: '1994-09-09',
      },
      {
        patientId: '12354',
        name: '강호동',
        gender: 'male',
        dateOfBirth: '1989-10-10',
      },
      {
        patientId: '12355',
        name: '김혜수',
        gender: 'female',
        dateOfBirth: '1995-11-11',
      },
      {
        patientId: '12356',
        name: '이동욱',
        gender: 'male',
        dateOfBirth: '1990-12-12',
      },
      {
        patientId: '12357',
        name: '송혜교',
        gender: 'female',
        dateOfBirth: '1984-01-13',
      },
      {
        patientId: '12358',
        name: '장동건',
        gender: 'male',
        dateOfBirth: '1983-02-14',
      },
      {
        patientId: '12359',
        name: '전지현',
        gender: 'female',
        dateOfBirth: '1996-03-15',
      },
      {
        patientId: '12360',
        name: '원빈',
        gender: 'male',
        dateOfBirth: '1982-04-16',
      },
      {
        patientId: '12361',
        name: '김태희',
        gender: 'female',
        dateOfBirth: '1997-05-17',
      },
      {
        patientId: '12362',
        name: '비',
        gender: 'male',
        dateOfBirth: '1981-06-18',
      },
      {
        patientId: '12363',
        name: '이효리',
        gender: 'female',
        dateOfBirth: '1998-07-19',
      },
      {
        patientId: '12364',
        name: '차승원',
        gender: 'male',
        dateOfBirth: '1980-08-20',
      },
      {
        patientId: '12365',
        name: '고소영',
        gender: 'female',
        dateOfBirth: '1999-09-21',
      },
      {
        patientId: '12366',
        name: '이병헌',
        gender: 'male',
        dateOfBirth: '1979-10-22',
      },
      {
        patientId: '12367',
        name: '김희선',
        gender: 'female',
        dateOfBirth: '2000-11-23',
      },
      {
        patientId: '12368',
        name: '정우성',
        gender: 'male',
        dateOfBirth: '1978-12-24',
      },
      {
        patientId: '12369',
        name: '김하늘',
        gender: 'female',
        dateOfBirth: '2001-01-25',
      },
      {
        patientId: '12370',
        name: '송중기',
        gender: 'male',
        dateOfBirth: '1977-02-26',
      },
      {
        patientId: '12371',
        name: '박보영',
        gender: 'female',
        dateOfBirth: '2002-03-27',
      },
      {
        patientId: '12372',
        name: '이준기',
        gender: 'male',
        dateOfBirth: '1976-04-28',
      },
      {
        patientId: '12373',
        name: '한가인',
        gender: 'female',
        dateOfBirth: '2003-05-29',
      },
      {
        patientId: '12374',
        name: '주지훈',
        gender: 'male',
        dateOfBirth: '1975-06-30',
      },
    ]);
  }
}
