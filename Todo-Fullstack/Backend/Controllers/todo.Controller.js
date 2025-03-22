let todoArray = [];

const gettodo = (req, res) => {
   res.status(200).json(todoArray);
};

const createtodo = (req, res) => {
   const todo = req.body;
   todoArray.push(todo);

   console.log("data is pushed");
   
   res.json(todo);

   if (!todo.title) {
      return res.status(400).json({ error: 'Title is required' });
   }

}


const deletetodo = (req, res) => {
   const { id } = req.params;
   const todo = arr[id];
   todoArray = todoArray.filter((todo, i) => i != id);
   res.json(todo);
}


const updatetodo = (req, res) => {
   const { id } = req.params;
   const todo = todoArray[id];
   const { title, completed } = req.body;
   if (title) {
      todo.title = title;
   }
   if (completed) {
      todo.completed = completed;
   }
   todoArray[id] = todo;
   res.json(todo);
}


module.exports = {
   gettodo, createtodo, updatetodo, deletetodo};