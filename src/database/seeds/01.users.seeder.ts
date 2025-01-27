import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UsersEntity } from 'src/modules/users/entity/users.entity';

export default class MoviesSeeder implements Seeder {
  track = false;

  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(UsersEntity);
    await repository.insert([
      {
        "patientId": "12345",
        "name": "김철수",
        "gender": "male",
        "dateOfBirth": "1990-01-01",
        "email": "kimchulsoo12345@example.com",
        "phone": "010-1234-5678"
      },
      {
        "patientId": "12346",
        "name": "이영희",
        "gender": "female",
        "dateOfBirth": "1992-02-02",
        "email": "leeyounghee12346@example.com",
        "phone": "010-2345-6789"
      },
      {
        "patientId": "12347",
        "name": "박민수",
        "gender": "male",
        "dateOfBirth": "1985-03-03",
        "email": "parkminsoo12347@example.com",
        "phone": "010-3456-7890"
      },
      {
        "patientId": "12348",
        "name": "최수민",
        "gender": "female",
        "dateOfBirth": "1988-04-04",
        "email": "choisoomin12348@example.com",
        "phone": "010-4567-8901"
      },
      {
        "patientId": "12349",
        "name": "정지훈",
        "gender": "male",
        "dateOfBirth": "1991-05-05",
        "email": "jungjihoon12349@example.com",
        "phone": "010-5678-9012"
      },
      {
        "patientId": "12350",
        "name": "한지민",
        "gender": "female",
        "dateOfBirth": "1987-06-06",
        "email": "hanjimin12350@example.com",
        "phone": "010-6789-0123"
      },
      {
        "patientId": "12351",
        "name": "오세훈",
        "gender": "male",
        "dateOfBirth": "1993-07-07",
        "email": "ohsehhoon12351@example.com",
        "phone": "010-7890-1234"
      },
      {
        "patientId": "12352",
        "name": "신혜수",
        "gender": "female",
        "dateOfBirth": "1986-08-08",
        "email": "shinhyesoo12352@example.com",
        "phone": "010-8901-2345"
      },
      {
        "patientId": "12353",
        "name": "유재석",
        "gender": "male",
        "dateOfBirth": "1994-09-09",
        "email": "yoojaesuk12353@example.com",
        "phone": "010-9012-3456"
      },
      {
        "patientId": "12354",
        "name": "강호동",
        "gender": "male",
        "dateOfBirth": "1989-10-10",
        "email": "kanghodong12354@example.com",
        "phone": "010-0123-4567"
      },
      {
        "patientId": "12355",
        "name": "김혜수",
        "gender": "female",
        "dateOfBirth": "1995-11-11",
        "email": "kimhyesoo12355@example.com",
        "phone": "010-1234-5678"
      },
      {
        "patientId": "12356",
        "name": "이동욱",
        "gender": "male",
        "dateOfBirth": "1990-12-12",
        "email": "leedongwook12356@example.com",
        "phone": "010-2345-6789"
      },
      {
        "patientId": "12357",
        "name": "송혜교",
        "gender": "female",
        "dateOfBirth": "1984-01-13",
        "email": "songhyegeo12357@example.com",
        "phone": "010-3456-7890"
      },
      {
        "patientId": "12358",
        "name": "장동건",
        "gender": "male",
        "dateOfBirth": "1983-02-14",
        "email": "jangdonggun12358@example.com",
        "phone": "010-4567-8901"
      },
      {
        "patientId": "12359",
        "name": "전지현",
        "gender": "female",
        "dateOfBirth": "1996-03-15",
        "email": "jeonjihyun12359@example.com",
        "phone": "010-5678-9012"
      },
      {
        "patientId": "12360",
        "name": "원빈",
        "gender": "male",
        "dateOfBirth": "1982-04-16",
        "email": "wonbin12360@example.com",
        "phone": "010-6789-0123"
      },
      {
        "patientId": "12361",
        "name": "김태희",
        "gender": "female",
        "dateOfBirth": "1997-05-17",
        "email": "kimtaehee12361@example.com",
        "phone": "010-7890-1234"
      },
      {
        "patientId": "12362",
        "name": "비",
        "gender": "male",
        "dateOfBirth": "1981-06-18",
        "email": "bi12362@example.com",
        "phone": "010-8901-2345"
      },
      {
        "patientId": "12363",
        "name": "이효리",
        "gender": "female",
        "dateOfBirth": "1998-07-19",
        "email": "leehyori12363@example.com",
        "phone": "010-9012-3456"
      },
      {
        "patientId": "12364",
        "name": "차승원",
        "gender": "male",
        "dateOfBirth": "1980-08-20",
        "email": "chaseungwon12364@example.com",
        "phone": "010-0123-4567"
      }
    ]);
  }
}
