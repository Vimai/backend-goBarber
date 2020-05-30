import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileServices from '@modules/users/services/ShowProfileServices';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileServices;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileServices(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'vinicius',
      email: 'vinicius@gmail.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('vinicius');
    expect(profile.email).toBe('vinicius@gmail.com');
  });

  it('should not be able to show the profile from non existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
