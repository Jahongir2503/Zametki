new Vue({
    el: '#app',
    data: {
        firstColumn: [],
        secondColumn: [],
        thirdColumn: [],
        note: {
            eventName: '',
            taskName: ''
        },
        error: '',

    },
    methods: {
        addNote() {
            if (this.note.eventName === '') {
                this.error = 'The name of the Note has not been entered';
                return;
            } else if (this.note.taskName === '') {
                this.error = 'Enter the task!';
                return;
            }
            this.error = '';

            this.firstColumn.push({
                event: this.note.eventName,
                task: this.note.taskName
            })
        }

    }
});
