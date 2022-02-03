import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id: userId }: IRequest): User {
    const updateUser = this.usersRepository.findById(userId);
    if (!updateUser) throw new Error('This user does not exist');
    if (updateUser.admin === true)
      throw new Error('Usuário já é administrador');

    const newAdminUser = this.usersRepository.turnAdmin(updateUser);

    return newAdminUser;
  }
}

export { TurnUserAdminUseCase };
