<template>
 <mat-card>
  <mat-form-field>
    
    <div class="container-fluid" style="border: top">
       
        <h1> Todo App </h1>
          <div class="todo">
            <input type="text" v-model="input" id="todoItem" placeholder="Add New Todo Item" v-on:keyup.enter="addTodo()" />
            <button type="button" v-on:click="addTodo()" class="btn btn-primary">Create</button>
        </div>
        <br/>
        <br/>
        <div class="row offset-4 col-md-4 offset-4">
          <div class="col-md-12">
            <!-- <input v-if="todos.length > 0" type="text" id="searchTodos" placeholder="Search in list of todos" v-mode.lazy="todos" v-on:input="searchTodos()"/> -->
            <input v-if="todos.length > 0" type="text" id="searchTodos" placeholder="Search in list of todos" v-model="search"/> 
              <ul class="list-group" v-if="todos.length > 0">
                <h2>List</h2>
                <!-- <li v-for="(todo, index) in todos" :key="index" class="list-group-item"> -->
                <li v-for="(todo, index) in filteredTodos" :key="index" class="list-group-item">

                  <input type="checkbox" class="checkbox" @click="checkTodo(todo)">
                    {{ todo.index }}. {{ todo.title }} - {{ todo.description}}
                  <br/>
                  <button type="button" class="btn btn-warning" @click="openEditingForm(todo)" title="It is not working just pass it through."> Edit </button>
                  <button type="button" class="btn btn-danger" @click="deleteTodo(todo)"> Delete </button>
                  <form v-if="todo.isEditting" action="editTodoDescription">
                      <input v-model="todo.description" type="text" id="editTodoDescription" placeholder="Edit Todo Item" v-on:keyup.enter="editTodoDescription(todo)">
                      <button class="btn btn-primary" v-on:click="editTodoDescription">Edit Description</button>
                  </form>
                </li>
                <br/>
                <div style="text-align:center;"> 
                  <input type="button" value="Done Selected Todos" class="btn btn-success btn-md btn-block" v-if="filteredTodos.length > 0" @click="doneSelectedTodos(todos)" title="Why it is not working I did not understand?? "/>
                </div>
              </ul>
          </div>
        </div>
    </div>
      </mat-form-field>
      <br/>
    </mat-card>
    
</template>

<script>
export default {
  name: "Todo",
  props: ['todo'],
  data() {
    return {
      index: 0,
      todos: [],
      input: "",
      checked: false,
      isEditting: false,
      search: "",
      msg: "Welcome to Todo App with Vue.js"
    };
  },
  methods: {
    addTodo() {
      // this.todos.push(this.input);
      var newTodo = {
        index: this.index++,
        title: this.input,
        description: "Undefined Description",
        checked: false,
        isEditting: false
      };
      // this.todos.push(this.input);
      console.log(newTodo);
      this.todos.push(newTodo);
      this.input = "";
      // console.log(this.todos);
    },
    openEditingForm(todo) {
      console.log('Edit todo desc entered');
      todo.isEditting = true;
      console.log('do some Task');
      //isEditting = false;
    },
    editTodoDescription(todo) {
      console.log('Edit todo desc entered');
      todo.isEditting = false;
      this.todos = this.todos.filter(function(todo) {
        return !todo.isEditting;
      });
      console.log('Editting form closed');
      //isEditting = false;
    },
    checkTodo(todo) {
      console.log("Check trying");
      todo.checked = !todo.checked;
      console.log("Statement  :" + todo.checked);
      //this.todos.indexOf(index).checked = true;
      // var statementOfTodo = this.todos[index].checked;
      // if (statementOfTodo) {
      //   this.todos[index].checked = false;
      //   console.log(this.todos[index].checked);
      // }else {
      //   this.todos[index].checked = true;
      //   console.log(this.todos[index].checked);
      // }
    },
    deleteTodo: function(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    doneSelectedTodos: function() {
      console.log('I ignored this method because it is not working properly. ')
      var toBeDeletedTodos = this.todos.filter(function(todo) {
        console.log(todo.checked);
        return todo.checked;
      });
      // console.log("Todos list  :" + this.todos);
      // toBeDeletedTodos.forEach(function(todo) {
      //   console.log(todo.index);
      //   var index = this.todos.indexOf(todo);
      //   //console.log(index);
      //   this.todos.splice(index, 1);
      // });

      this.todos = this.todos.filter(function(todo) {
        return !todo.checked;
      });
      
    }
  },
  computed: {
    filteredTodos: function() {
      return this.todos.filter(todo => {
        return todo.title.match(this.search);
      });
    }
  }
};
</script>

<style scoped>
.todo input {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 400px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  padding: 15px;
  border-radius: 20px;
}
a {
  color: #42b983;
}
#todoItem,
#searchTodos {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 400px;
}
</style>
