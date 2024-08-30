import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async createTodo(title: string, user: User): Promise<Todo> {
    const todo = this.todoRepository.create({ title, user });
    return this.todoRepository.save(todo);
  }

  async findTodosByUser(user: User): Promise<Todo[]> {
    return this.todoRepository.find({ where: { user } });
  }

  async updateTodo(id: number, title: string, completed: boolean): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (todo) {
      todo.title = title;
      todo.completed = completed;
      return this.todoRepository.save(todo);
    }
    return null;
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
