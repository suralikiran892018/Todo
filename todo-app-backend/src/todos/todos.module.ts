import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller'; // Assuming you have a controller
import { Todo } from './todo.entity'; // Adjust the path as needed
import { UsersModule } from '../users/users.module'; // Import UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    UsersModule, // Import UsersModule here
  ],
  providers: [TodosService],
  controllers: [TodosController],
  exports: [TodosService], // Export TodosService if needed
})
export class TodosModule {}
