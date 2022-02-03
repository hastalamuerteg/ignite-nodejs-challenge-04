import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id: userId }: IRequest): User {
    const foundUser = this.usersRepository.findById(userId);
    if (!foundUser) throw new Error("Couldn't find this user");
    return foundUser;
  }
}

export { ShowUserProfileUseCase };
