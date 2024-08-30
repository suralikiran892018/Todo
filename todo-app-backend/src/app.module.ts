import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module'; // Assuming you have a TodosModule
import { User } from './users/user.entity';
import { Todo } from './todos/todo.entity'; // Adjust import path as needed

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // Path to your SQLite database file
      entities: [User, Todo],
      synchronize: true,
    }),
    UsersModule,
    TodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
