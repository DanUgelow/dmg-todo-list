//////////////////////////////////////
// Utility functions
//////////////////////////////////////

const createUniqueId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}



//////////////////////////////////////
// App code
//////////////////////////////////////

const InputContainer = (props) => {
  return (
    <form onSubmit={ props.handleSubmit }>
      <input type='text' onChange={ props.handleChange } value={props.inputText}/>
      <input type='submit' value='Submit'/>
    </form>
  )
}

class Todo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: props.todo.text,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    const todo = {
      ...this.props.todo,
      text: this.state.text,
    }

    this.props.submitEdit(todo)
  }

  render() {
    const {
      editTodo,
      completeTodo,
      deleteTodo,
      todo
    } = this.props

    return !todo.editing
    ? (
      <li>
        <p className={ todo.complete ? 'complete' : '' }>{ this.state.text }</p>
        <button onClick={ editTodo(todo.id) }>Edit</button>
        <button onClick={ completeTodo(todo.id) }>Complete</button>
        <button onClick={ deleteTodo(todo.id) }>Delete</button>
      </li>
    )
    : (
      <li>
        <form onSubmit={ this.handleSubmit }>
          <input type='text' value={ this.state.text } onChange={ this.handleChange }/>
          <input type='submit' value='Submit'/>
        </form>
      </li>
    )
  }
}

const TodoList = props => {
  const todoElements = props.todos.map(todo => <Todo key={ todo.id } todo={ todo } { ...props } />)

  return (
    <ul>
      { todoElements }
    </ul>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: '',
      todos: [],
    }

    this.updateInputText = this.updateInputText.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.editTodo = this.editTodo.bind(this)
    this.submitEdit = this.submitEdit.bind(this)
    this.completeTodo = this.completeTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  updateInputText(e) {
    e.preventDefault()

    this.setState({
      inputText: e.target.value,
    })
  }

  addTodo(e) {
    e.preventDefault()

    const copyArray = [].concat(
      this.state.todos,
      [{
        complete: false,
        editing: false,
        id: createUniqueId(),
        text: this.state.inputText,
      }]
    )

    this.setState({
      inputText: '',
      todos: copyArray,
    })
  }

  editTodo(id) {
    return e => {
      const todos = this.state.todos.map(todo => {
        if(id === todo.id) {
          todo.editing = true
        }
        return todo
      })

      this.setState({ todos })
    }
  }

  submitEdit(todo) {
    const todos = this.state.todos.map(t => {
      if(todo.id === t.id) {
        t.text = todo.text
        t.editing = false
      }
      return t
    })

    this.setState({ todos })
  }

  completeTodo(id) {
    return e => {
      const todos = this.state.todos.map(todo => {
        if(id === todo.id) {
          todo.complete = true
        }
        return todo
      })

      this.setState({ todos })
    }
  }

  deleteTodo(id) {
    return e => {
      const todos = this.state.todos.filter(todo => todo.id !== id)

      this.setState({ todos })
    }
  }

  render() {
    return (
      <div>
        <InputContainer handleChange={ this.updateInputText } handleSubmit={ this.addTodo } inputText={this.state.inputText}/>
        <TodoList todos={ this.state.todos } editTodo={ this.editTodo } submitEdit={ this.submitEdit } completeTodo={ this.completeTodo } deleteTodo={ this.deleteTodo }/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
