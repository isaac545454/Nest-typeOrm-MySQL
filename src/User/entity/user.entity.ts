import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({
    length: 63,
  })
  name: string;

  @Column()
  password: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column({
    type: "date",
    nullable: true,
  })
  birthAt: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({
    enum: [1, 2],
  })
  role: number;
}
