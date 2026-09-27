const fs = require("fs");
const { Command } = require('commander');
const program = new Command();

if (!fs.existsSync("tasks.json")) {
	fs.writeFileSync("tasks.json","[]");
}
const tasks = JSON.parse(fs.readFileSync("tasks.json","utf-8"));

function Task(description,priority) {
	this.description = description;
	this.priority = priority;
};

program
  .name("noter")
  .description("A simple cli noting program")
  .version("1.0")

program
  .command("add <task>")
  .option("-p --priority <level>","Priority:low,medium,high","low")
  .description("Adds new task")
  .action((task,options) => {
	  tasks.push(new Task(task,options.priority));
	  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  });

program
  .command("list")
  .description("List all tasks")
  .action(() => {
	  console.log("---------------");
	  for(let i of tasks) {
		  console.log("description:" + i.description);
		  console.log("priority:" + i.priority);
		  console.log("---------------");
	  };
  });

program
  .command("remove <task>")
  .description("Removes task")
  .action((task) => {
	  for(let i = 0;i<tasks.length;i++) {
		  if(task == tasks[i].description) {
			  tasks.splice(i,1);
		  }
	  };
	  fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
  });


program.parse();
