import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TodosService } from './todos.service';
import { UsersService } from '../users/users.service'; // Adjust the path as needed

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly usersService: UsersService, // Inject UsersService
  ) {}

  @Post()
  async createTodo(@Body() body: { username: string; title: string }) {
    const user = await this.usersService.findByUsername(body.username);
    if (user) {
      return this.todosService.createTodo(body.title, user);
    }
    return { message: 'User not found' };
  }

  @Get(':username')
  async getTodos(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      return this.todosService.findTodosByUser(user);
    }
    return { message: 'User not found' };
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: number,
    @Body() body: { title: string; completed: boolean },
  ) {
    return this.todosService.updateTodo(id, body.title, body.completed);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number) {
    return this.todosService.deleteTodo(id);
  }
}
