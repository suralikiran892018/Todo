import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from '../todos/todo.entity'; // Adjust the import path as needed

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string; // Ensure passwords are hashed

  @OneToMany(() => Todo, todo => todo.user)
  todos: Todo[];
}
