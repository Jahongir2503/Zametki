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
            this.note.taskName = ['', '', ''];

        },

        deleteNote(index) {
            this.firstColumn.splice(index, 1);
        },
        addTaskRow() {
            if (this.note.taskName.length < 5) {
                this.note.taskName.push({text: '', completed: false});
            }
        },
    }
});
