export default function taskReducer(tasks, action) {
  console.log(action);
  switch (action.type) {
    case "initTasks": {
      return tasks;
    }
    case "added": {
      return "added";
    }
    case "updated": {
      return "added";
    }
    case "deleted": {
      return "added";
    }

    default: {
      throw new Error("No action found");
    }
  }
}
