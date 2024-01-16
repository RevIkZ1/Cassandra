import { Injectable, OnModuleInit } from '@nestjs/common';
import { mapping, types } from 'cassandra-driver';
import { LoginDto, User } from './user.model';
import { JwtService } from '@nestjs/jwt';

import { CassandraService } from 'src/common/cassandra/cassandra.service';
import { Tim } from 'src/tim/tim.model';
@Injectable()
export class UserRepository implements OnModuleInit {
  constructor(
    private cassandraService: CassandraService,
    private jwtService: JwtService,
    private timRepository: JwtService,
  ) {}

  userMapper: mapping.ModelMapper<User>;

  onModuleInit() {
    const mappingOptions: mapping.MappingOptions = {
      models: {
        User: {
          tables: ['user'],
          mappings: new mapping.UnderscoreCqlToCamelCaseMappings(),
        },
      },
    };

    this.userMapper = this.cassandraService
      .createMapper(mappingOptions)
      .forModel('user');
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const query = 'SELECT * FROM user;';
      const result = await this.cassandraService.execute(query);
      return result.rows;
    } catch (error) {
      return [];
    }
  }

  async findUserById(userId: number): Promise<User | null> {
    try {
      const query = 'SELECT * FROM user WHERE UserID = ?;';
      const result = await this.cassandraService.execute(query, [userId]);
      return result.rows[0];
    } catch (error) {
      return null;
    }
  }

  async addUser(user: User) {
    try {
      // Check if the username already exists
      const existingUser = await this.getUserByUsername(user.username);

      if (existingUser) {
        // If the username already exists, handle the error or return a specific result
        console.error('Username already exists');
        return null;
      }

      // Generate a new UUID for the user
      user.UserID = types.Uuid.random();

      // Insert the user into the database with ifNotExists clause
      return (await this.userMapper.insert(user)).toArray();
    } catch (error) {
      // Handle other errors
      console.error('Error adding user:', error);
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM user WHERE username = ? allow filtering';
    const params = [username];

    try {
      const result = await this.cassandraService.execute(query, params);

      if (result.rowLength === 0) {
        return null;
      }

      return result.first();
    } catch (error) {
      console.error('Error executing user query:', error);
      throw error;
    }
  }

  async getUserByUsernameAndPassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    try {
      console.log(username);
      console.log(password);
      const query =
        'SELECT * FROM user WHERE username = ? AND password = ? allow filtering;';
      const result = await this.cassandraService.execute(query, [
        username,
        password,
      ]);
      return result.rows[0];
    } catch (error) {
      // Obrada grešaka
      return null;
    }
  }

  async signIn(loginDto: LoginDto): Promise<string | null> {
    const user = await this.getUserByUsernameAndPassword(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      return null;
    }

    const payload = {
      sub: user.UserID, // Adjust based on your Admin entity structure
      username: user.username,
      password: user.password,
      listatimova: user.listatimova,
    };
    const jwt = await this.jwtService.signAsync(payload);
    return jwt;
  }
  async getUserByUser(username: string): Promise<User | null> {
    const query = 'SELECT * FROM user WHERE username = ?';
    const params = [username];

    try {
      const result = await this.cassandraService.execute(query, params);

      if (result.rowLength === 0) {
        return null;
      }

      const user = result.first();
      return {
        UserID: user.UserID,
        username: user.username,
        password: user.password,
        listatimova: user.listatimova,
      };
    } catch (error) {
      console.error('Error executing Cassandra query:', error);
      throw error;
    }
  }
  async addTeamToUser(userId: string, teamId: string) {
    const user = await this.UserById(userId);
    console.log(user);
    if (user && user.listatimova && user.listatimova.includes(teamId)) {
      console.log('Tim već postoji u listi.');
      return null; // Ako tim već postoji, možete vratiti odgovarajuću vrijednost (u ovom slučaju null)
    }

    const query = `UPDATE utakmice.user SET listatimova = listatimova + ['${teamId}'] WHERE "UserID" = ${userId}`;
    const params = [];
    const result = await this.cassandraService.execute(query, params);

    return result; // Vratite rezultat ili odgovarajuću vrijednost ovisno o potrebi
  }
  async UserById(userId: string): Promise<User | null> {
    try {
      console.log(userId);
      const query = `SELECT * FROM user WHERE "UserID" = ${userId}`;
      const result = await this.cassandraService.execute(query);
      console.log(result);
      return result.rows[0];
    } catch (error) {
      // Obrada grešaka
      return null;
    }
  }
  async VratiSveTimove(userId: string): Promise<Tim[]> {
    const listaTimovaQuery = `SELECT "listatimova" FROM user WHERE "UserID" = ${userId}`;

    try {
      const listaTimovaResult =
        await this.cassandraService.execute(listaTimovaQuery);

      // Provera da li korisnik postoji
      if (listaTimovaResult.rowLength === 0) {
        console.error('Korisnik sa datim ID-jem ne postoji.');
        return [];
      }

      const listaTimovaIds = listaTimovaResult.rows[0].listatimova || [];

      // Ako korisnik nema timova, odmah vraćamo prazan niz
      if (listaTimovaIds.length === 0) {
        console.log('Korisnik nema timova.');
        return [];
      }

      // Za svaki ID tima, dohvati informacije o tom timu
      const timovi = await Promise.all(
        listaTimovaIds.map(async (timId) => {
          const timQuery = `SELECT * FROM tim WHERE "TimID" = ${timId}`;
          const timResult = await this.cassandraService.execute(timQuery);
          return timResult.rows[0];
        }),
      );

      return timovi.filter(Boolean);
    } catch (error) {
      console.error('Greška prilikom izvršavanja upita:', error);
      return [];
    }
  }
}
