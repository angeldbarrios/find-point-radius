const UserUseCases = require('../../../src/application/use-cases/userUseCases');

test('it should get user', async () => {
  const mockedUserData = {
    userId: '48480',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com'
  };

  const mockUserRepository = {};
  mockUserRepository.getUserById = jest.fn(() => {
    return mockedUserData;
  });

  const appContext = {
    repositories: {
      userRepository: mockUserRepository
    }
  };

  const userUseCases = new UserUseCases(appContext);
  const data = await userUseCases.getUser('1');

  expect(mockUserRepository.getUserById).toHaveBeenCalledWith('1');
  expect(data).toEqual(mockedUserData);
});