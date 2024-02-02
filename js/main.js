new Vue({
    el: '#app',
    data: {
        firstColumn: [],
        secondColumn: [],
        thirdColumn: [],
        note: {
            eventName: '',
            taskName: [
                {id: 1, text: '', completed: false},
                {id: 2, text: '', completed: false},
                {id: 3, text: '', completed: false}
            ],
        },
        error: '',
    },
    methods: {
        addNote() {
            if (this.note.eventName === '') {
                this.error = 'The name of the Note has not been entered';
                return;
            } else if (this.note.taskName.some(task => task.text === '')) {
                this.error = 'Enter the task!';
                return;
            }
            this.error = '';

            this.firstColumn.push({
                event: this.note.eventName,
                taskName: this.note.taskName.map(task => ({...task})),
                completedDate: null,
            });

            this.note.eventName = '';
            this.note.taskName = [
                {id: 1, text: '', completed: false},
                {id: 2, text: '', completed: false},
                {id: 3, text: '', completed: false}
            ];
        },
        addTaskRow() {
            if (this.note.taskName.length < 5) {
                this.note.taskName.push({id: this.note.taskName.length + 1, text: '', completed: false});
            }
        },
        updateNoteStatus(note, index) {
            const completedTasks = note.taskName.filter(task => task.completed).length;
            const completionPercentage = (completedTasks / note.taskName.length) * 100;

            if (completionPercentage >= 50 && this.secondColumn.length < 5) {
                this.secondColumn.push({...note, taskName: note.taskName.map(task => ({...task}))});
                this.firstColumn.splice(this.firstColumn.indexOf(note), 1);
            }

            if (completionPercentage === 100) {
                note.completedDate = new Date().toLocaleString();
                this.thirdColumn.push({...note, taskName: note.taskName.map(task => ({...task}))});
                this.secondColumn.splice(index, 1);
            }
        },
    },
});
