import { Exclude, classToPlain } from "class-transformer";
import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "varchar", nullable: false })
	name: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	email: string;

	@Exclude()
	@Column({ type: "varchar", nullable: false })
	password: string;

	@Column({ type: "boolean", default: false })
	isConfirmed: boolean;

	@Exclude()
	@Column()
	@Generated("uuid")
	confirmationLink: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	toJSON() {
		return classToPlain(this);
	}
}
