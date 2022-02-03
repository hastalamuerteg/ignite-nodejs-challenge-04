import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string | string[];
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id: userId }: IRequest): User[] {
    const doesAdminUserExist = this.usersRepository.findById(userId);
    if (!doesAdminUserExist) throw new Error('Usuário não encontrado');
    if (doesAdminUserExist && doesAdminUserExist.admin !== true) {
      throw new Error('Usuário sem permissão');
    }
    const list = this.usersRepository.list();
    return list;
  }
}

export { ListAllUsersUseCase };
