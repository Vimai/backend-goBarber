import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
// import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
