import { DeepPartial, FindOptionsWhere } from "typeorm";
import AppDataSource from "../db";
import { CreateUserDto } from "../dto/users.dto";
import { User } from "../models/user.entity";

class UserService {
	private readonly userRepository = AppDataSource.getRepository(User);

	getOne = async (options: FindOptionsWhere<User>[] | FindOptionsWhere<User>): Promise<User | null> => {
		return this.userRepository.findOne({ where: options });
	};

	getMany = async (options?: FindOptionsWhere<User>[] | FindOptionsWhere<User>): Promise<User[]> => {
		return this.userRepository.find({ where: options });
	};

	create = async (options: CreateUserDto): Promise<User> => {
		const user = this.userRepository.create(options);
		return this.userRepository.save(user);
	};

	delete = async (options: FindOptionsWhere<User>) => {
		return this.userRepository.delete(options);
	};

	update = async (user: User, updated_user: DeepPartial<User>): Promise<User> => {
		await this.userRepository.save({ ...user, ...updated_user });
		return this.getOne({ id: user.id }) as Promise<User>;
	};
}

export default UserService;
