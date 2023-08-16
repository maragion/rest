export function changeTaskStatus(obj) {
    let subTaskCounter = obj.subTasks.length;
    let completeCounter = 0;

    for (let i = 0; i < subTaskCounter; i++) {
        if (obj.subTasks[i].isComplete === true) {
            completeCounter++
        }
    }

    if (completeCounter === subTaskCounter) {
        console.log("equal")
        obj.taskStatus = 2
    } else if (completeCounter !== 0 && completeCounter < subTaskCounter) {
        obj.taskStatus = 1
        console.log("progress")
    } else {
        obj.taskStatus = 0
    }
}
