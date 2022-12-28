let Tasks = []

function addTask(task) { 
    Tasks.push(task)
}

class Task { 
    constructor (title,description,dueDate,priority) { 
        this.title = title 
        this.description = description
        this.dueDate = dueDate
        // this.priority = priority
    }
}

const task1 = new Task("a","a",2022-12-22)
addTask(task1)


const button = document.querySelector('#submitButton')

const box = document.querySelector('#box')

const titleInput = document.getElementById('titleInput')
const descInput = document.getElementById('descInput')
const dueDateInput = document.getElementById('dueDate')

button.addEventListener('click', () => { 
    let x = new Task(titleInput.value,descInput.value,dueDateInput.value)
    addTask(x)
    console.table(Tasks)
    tasksLoop()
    

})

function tasksLoop() {  
    let table = document.createElement('table')
    table.style.border = "1px solid #000"


    for( i = 0; i < Tasks.length; i+=1) {
        const row = document.createElement('tr')

        [Tasks[i].title, Tasks[i].description, Tasks[i].dueDate].forEach((prop) => { 
            const cell = document.createElement('td')
            cell.textContent = prop 
            row.appendChild(cell)
           
          }) 
          table.appendChild(row)


        } 

        box.innerHTML = ""
        box.appendChild(table)
    }
         
        
    


