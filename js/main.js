new Vue({
    el: '#app',
    data: {
        firstColumn: [],
        secondColumn: [],
        thirdColumn: [],
        note: {
            eventName: '',
            taskName: [
                {text: '', component: false},
                {text: '', component: false},
                {text: '', component: false}
            ],

        },
        error: '',

    },
    methods: {
        addNote() {
            if (this.note.eventName === '') {
                this.error = 'The name of the Note has not been entered';
                return;
            } else if (this.note.taskName.some(task => task === '')) {
                this.error = 'Enter the task!';
                return;
            }
            this.error = '';

            this.firstColumn.push({
                event: this.note.eventName,
                taskName: [...this.note.taskName]
            })
            this.note.eventName = '';


        },

        deleteNote(index) {
            this.firstColumn.splice(index, 1);
        },
        addTaskRow() {
            if (this.note.taskName.length < 5) {
                this.note.taskName.push({text: '', completed: false});
            }
        },
        checkedTaskProsent(note) {
            const comletedTasks = note.taskName.filter(task => task.completed).length;
            return (comletedTasks / note.taskName.length) * 100;
        },
        movingNotes(index) {
            const taskToMove = this.firstColumn[index].taskName[taskIndex];
            if (taskToMove.component) {

            }
        },
        saveInlocalStorage() {
            const SaveNots = localStorage.getItem("Nots")
            if (SaveNots) {
                console.log(JSON.parse((SaveNots)));
            }
        },

    },
    watch: {
        firstColumn: {
            handler: function (newNotes) {
                newNotes.forEach((note, index) => {
                    if (this.checkedTaskProsent(note) >= 50) {
                        this.secondColumn.push(note);
                        this.firstColumn.splice(index, 1);
                    }
                });
            },
            deep: true
        }

    }
});
